// import loading1 from "../assets/gifs/loading-1.gif"
// import loading2 from "../assets/gifs/loading-2.gif"
// import loading3 from "../assets/gifs/loading-3.gif"
// import loading4 from "../assets/gifs/loading-4.gif"
// import loading5 from "../assets/gifs/loading-5.gif"
// import loading6 from "../assets/gifs/loading-6.gif"
// import loading7 from "../assets/gifs/loading-7.gif"
// import loading8 from "../assets/gifs/loading-8.gif"
// import loading9 from "../assets/gifs/loading-9.gif"
// import loading10 from "../assets/gifs/loading-10.gif"
// import loading11 from "../assets/gifs/loading-11.gif"
// import loading12 from "../assets/gifs/loading-12.gif"
// import loading13 from "../assets/gifs/loading-13.gif"
// import loading14 from "../assets/gifs/loading-14.gif"
// import loading15 from "../assets/gifs/loading-15.gif"
// import loading16 from "../assets/gifs/loading-16.gif"
// import loading17 from "../assets/gifs/loading-17.gif"
// import loading18 from "../assets/gifs/loading-18.gif"
// import loading19 from "../assets/gifs/loading-19.gif"
// import loading20 from "../assets/gifs/loading-20.gif"

// const gifLinks = [loading1, loading2, loading3, loading4, loading5, loading6, loading7, loading8, loading9, loading10, loading11, loading12, loading13, loading14, loading15, loading16, loading17, loading18, loading19, loading20]

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

    const duration = 18000; // total duration in ms
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
    <Dialog open={isFetching}>
      
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
