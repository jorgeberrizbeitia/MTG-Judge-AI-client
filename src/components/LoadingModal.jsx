import gifLinks from "../utils/gif-links.js";

import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
  Box
} from "@mui/material";

import { useState, useEffect } from "react"

function LoadingModal({isFetching}) {

  const [gifIndex, setGifIndex] = useState(Math.floor(Math.random() * gifLinks.length ))
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    
    if (!isFetching) {
      // restarting values for next question
      setGifIndex(Math.floor(Math.random() * gifLinks.length ))
      setProgress(0)
      return; // don't start the interval if the data is not being fetched
    }

    const duration = 20000; // total duration in ms
    const interval = 100; // update every 100ms
    const increment = (100 * interval) / duration;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return oldProgress + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isFetching]);

  const handleUpdateGif = () => setGifIndex( Math.floor(Math.random() * gifLinks.length ))

  return (
    <Dialog open={isFetching} className="fade-in">
      
      <DialogTitle>
        Model is reasoning... this could take up to 20 seconds
      </DialogTitle>

      <DialogContent>
        <Box sx={{ width: "100%" }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      </DialogContent>

      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Enjoy this selection of MTG gifs while you wait
        </Typography>
        <img onClick={handleUpdateGif} src={gifLinks[gifIndex]} alt="gif" width="250px" />
      </DialogContent>
    
    </Dialog>
  );
}
export default LoadingModal;
