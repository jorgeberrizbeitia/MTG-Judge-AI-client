import axios from "axios"
import { useEffect, useState, useRef } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
  Paper,
  ListItemButton,
  IconButton,
} from "@mui/material"

import ResponseBox from "../components/ResponseBox"
import LoadingModal from "../components/LoadingModal"

function AskQuestion() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [allCards, setAllCards] = useState([])

  // card search state
  const [cardSuggestions, setCardSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedCards, setSelectedCards] = useState([])

  const inputRef = useRef(null)

  useEffect(() => { 
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/cards`)
      console.log("loaded cards", response.data.cards.length)
      setAllCards(response.data.cards)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAsk = async () => {
    setIsFetching(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/test`, { question, cards: selectedCards })
      setAnswer(response.data)
      console.log(response.data)
      const allQuestions = JSON.parse(localStorage.getItem("allQuestions")) || []
      allQuestions.push({
        question,
        answer: response.data,
        date: new Date().toString(),
        selectedCards,
      })
      localStorage.setItem("allQuestions", JSON.stringify(allQuestions))

      setIsFetching(false)

    } catch (error) {
      console.log(error)
      setIsFetching(false)
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    setQuestion(value)

    if (e.target.value === "") {
      setSelectedCards([])
      return
    }

    const lastOpen = value.lastIndexOf("[")
    const lastClose = value.lastIndexOf("]")

    if (lastOpen > lastClose) {
      const searchTerm = value.slice(lastOpen + 1).trim()
      if (searchTerm.length > 0) {
        const matches = allCards.filter((c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setCardSuggestions(matches.slice(0, 5))
        setShowSuggestions(true)
      } else {
        setShowSuggestions(false)
      }
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSelectCard = (card) => {
    const lastOpen = question.lastIndexOf("[")
    const lastClose = question.lastIndexOf("]")
    let newValue = ""

    if (lastOpen > lastClose) {
      const previousText = question.slice(0, lastOpen + 1)
      newValue = previousText + card.name + "] "
    } else {
      newValue = question + `[${card.name}]`
    }

    setQuestion(newValue)
    setShowSuggestions(false)

    if (!selectedCards.find((c) => c.uuid === card.uuid)) {
      setSelectedCards((prev) => [...prev, card])
    }

    if (inputRef.current) inputRef.current.focus()
  }

  const handleRemoveCard = (card) => {
    setSelectedCards(selectedCards.filter((c) => c.uuid !== card.uuid))
    setQuestion(question.replace(`[${card.name}]`, ""))
  }

  const handleReset = () => {
    setQuestion("")
    setIsFetching(false)
    setAnswer(null)
    setCardSuggestions([])
    setShowSuggestions(false)
    setSelectedCards([])
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      
      <Typography variant="h4">Ask your MTG related question</Typography>

      {/* Question Input */}
      <Card sx={{ overflow: "visible" }}>
        <CardContent>
          <Box sx={{ position: "relative", display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                fullWidth
                label="Your Question"
                variant="outlined"
                value={question}
                onChange={handleChange}
                inputRef={inputRef}
                multiline
                disabled={answer}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAsk}
                disabled={!question || isFetching || answer}
              >
                {isFetching ? <CircularProgress size={24} /> : "Ask"}
              </Button>
            </Box>

            {/* Suggestion dropdown */}
            {showSuggestions && cardSuggestions.length > 0 && (
              <Paper
                sx={{
                  position: "absolute",
                  top: "62px",
                  left: 0,
                  width: "100%",
                  zIndex: 20,
                  maxHeight: 200,
                  overflowY: "auto",
                }}
                elevation={3}
              >
                {cardSuggestions.map((card) => (
                  <ListItemButton key={card.uuid} onClick={() => handleSelectCard(card)}>
                    {card.name}
                  </ListItemButton>
                ))}
              </Paper>
            )}

            {/* Selected card details */}
            {selectedCards.length > 0 && (
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {selectedCards.map((card) => (
                  <Card key={card.uuid} sx={{ width: 200, height: 275, position: "relative", overflow: "visible"}}>
                  {/* Remove button */}
                  {!answer && <IconButton
                    size="small"
                    onClick={() => handleRemoveCard(card)}
                    sx={{
                      width: "20px",
                      height: "20px",
                      position: "absolute",
                      top: -7,
                      right: -7,
                      backgroundColor: "rgba(0,0,0,0.6)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.8)",
                      },
                    }}
                  >
                    ✕
                  </IconButton> }

                  {/* <CardContent>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {card.name}
                    </Typography>
                  </CardContent> */}

                  {card.multiverseId && (
                     <img
                      src={`https://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=${card.multiverseId}`}
                      alt={card.name}
                      style={{ maxWidth: "100%" }}
                    />
                  )}
                </Card>

                ))}
              </Box>
            )}

          </Box>
        </CardContent>
      </Card>

      {/* Response */}
      {!isFetching && answer && (
        <ResponseBox answer={answer} handleReset={handleReset}/>
      )}

      {/* Loading state */}
      {isFetching && !answer && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      <LoadingModal isFetching={isFetching}/>

    </Box>
  )
}

export default AskQuestion

