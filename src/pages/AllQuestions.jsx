import { useState } from "react"
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  List,
} from "@mui/material"

function AllQuestions() {

  const [allQuestions, setAllQuestions] = useState(JSON.parse(localStorage.getItem("allQuestions")) || [])
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  const handleOpen = (question) => {
    setSelected(question)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelected(null)
  }

  const handleDelete = (index) => {
    const updatedQuestions = [...allQuestions]
    updatedQuestions.splice(index, 1)
    localStorage.setItem("allQuestions", JSON.stringify(updatedQuestions))
    if (selected && selected.date === allQuestions[index].date) {
      handleClose()
    }
    setAllQuestions(updatedQuestions)
  }

  const handleDeleteAll = () => {
    localStorage.removeItem("allQuestions")
    setAllQuestions([])
  }

  const handleConfirmDeleteAll = () => {
    setConfirmDeleteOpen(true)
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} className="fade-in">
      <Typography variant="h4" gutterBottom>
        All your questions
      </Typography>

      {(!allQuestions || !allQuestions.length) && (
        <Typography variant="subtitle1" color="text.secondary">
          ... you haven't ask your first question
        </Typography>
      )}

      <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {allQuestions.map((question, i) => (
          <Card key={i}>
            <CardActionArea onClick={() => handleOpen(question)} disableRipple>
              <CardContent>
                <Typography variant="body1" gutterBottom noWrap>
                  {question.question}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Asked on: {new Date(question?.date).toLocaleString()}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </List>

      {/* Modal with details */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" className="fade-in">
        {selected && (
          <>
            <DialogTitle>Question Details</DialogTitle>
            <DialogContent dividers>
              <Typography variant="body1" gutterBottom>
                <strong>Question:</strong> {selected.question}
              </Typography>
                {selected.selectedCards?.length > 0 && ( 
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", m: 2}}>
                  {selected.selectedCards.map((card) => (
                    <img
                      src={`https://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=${card.multiverseId}`}
                      alt={card.name}
                      style={{ maxWidth: "100%", borderRadius: 8, width: 200 }}
                    />
                  ))}
                </Box>
              )}

              <Typography variant="body1" gutterBottom>
                <strong>Short Answer:</strong> {selected.answer.short_answer}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Full Explanation:</strong> {selected.answer.full_explanation}
              </Typography>
              <Typography variant="body1">
                <strong>Sources:</strong> {selected.answer.sources}
              </Typography>
              <Divider sx={{ mt: 2 }} />
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mt: 1 }}
              >
                Asked on: {new Date(selected.date).toLocaleString()}
              </Typography>
            </DialogContent>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "flex-flex-start", p: 2 }}>
              <Typography
                variant="button"
                color="error"
                onClick={() => {
                  const index = allQuestions.findIndex(q => q.date === selected.date)
                  handleDelete(index)
                }}
                sx={{ cursor: "pointer" }}
              >
                Delete Question
              </Typography>
            </Box>
          </>
        )}
      </Dialog>

      {allQuestions.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography
            variant="button"
            color="error"
            onClick={handleConfirmDeleteAll}
            sx={{ cursor: "pointer" }}
          >
            Delete All Questions
          </Typography>
        </Box>
      )}

      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Confirm Delete All</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete all questions? This action cannot be undone.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
            <Typography
              variant="button"
              color="primary"
              onClick={() => setConfirmDeleteOpen(false)}
              sx={{ cursor: "pointer" }}
            >
              Cancel
            </Typography>
            <Typography
              variant="button"
              color="error"
              onClick={() => {
                handleDeleteAll()
                setConfirmDeleteOpen(false)
              }}
              sx={{ cursor: "pointer" }}
            >
              Confirm
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default AllQuestions
