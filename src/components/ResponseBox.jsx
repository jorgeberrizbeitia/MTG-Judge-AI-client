import { useState } from "react";
import { Card, CardContent, Typography, Divider, Button, Box, CardActions } from "@mui/material";
import TypingMessage from "./TypingMessage";

function ResponseBox({ answer, handleReset }) {
  const allData = [
    { label: "Rephrased Question:", text: answer.question },
    { label: "Short Answer:", text: answer.short_answer },
    { label: "Full Explanation:", text: answer.full_explanation },
    { label: "Sources:", text: answer.sources }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDoneTyping, setIsDoneTyping] = useState(false)

  const handleDone = () => {
    if (currentIndex + 1 < allData.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(allData.length) // so the full text is displayed
      setIsDoneTyping(true) // for the button to appear
    }
  };

  return (
    <>
      <Card sx={{ mb: 5, pb: 2}}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Judge Calling
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Render finished messages */}
          <Box sx={{textAlign: "start"}}>
          {allData.slice(0, currentIndex).map((m, i) => (
            <Box key={i} sx={{pb: 2}}>
              <Typography color="primary" variant="p"><strong>{m.label}</strong></Typography>{" "}
              {m.text}
            </Box>
          ))}
          </Box>

          {/* Render the currently typing message */}
          <Box sx={{textAlign: "start"}}>
          {currentIndex < allData.length && !isDoneTyping && (
            <Box sx={{textAlign: "start"}}>
              <Typography color="primary" variant="p"><strong>{allData[currentIndex].label}</strong></Typography>{" "}
              <TypingMessage
                key={currentIndex} // to force react to recreate the component, it prevents duplicate text from previous messages
                message={allData[currentIndex].text}
                speed={50}
                onDone={handleDone}
              />
            </Box>
          )}
          </Box>
        </CardContent>
      
        {isDoneTyping && 
          <CardActions sx={{display: "flex", justifyContent: "center"}}>
            <Button
              variant="contained"
              className="fade-in ask-btn-delay"
              size="large"
              sx={{ mb: 4 }}
              onClick={handleReset}
            >
              Ask a new Question
            </Button>
          </CardActions>
        }

      </Card>

    </>
  );
}

export default ResponseBox;
