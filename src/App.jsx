import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AskQuestion from "./pages/AskQuestion";
import AllQuestions from "./pages/AllQuestions";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { lightTheme, darkTheme } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

function App() {

  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const allQuestions = localStorage.getItem("allQuestions");
    if (allQuestions === null) {
      localStorage.setItem("allQuestions", "[]");
    }
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div style={{ minHeight: "100dvh" }}>
        {/* Resets default browser styles */}
        <CssBaseline />

        <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>

        {/* Main content container */}
        <Container maxWidth="md">
          <Box sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ask-question" element={<AskQuestion />} />
              <Route path="/all-questions" element={<AllQuestions />} />

              {/* error pages */}
              <Route path="/error" element={<Error />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
