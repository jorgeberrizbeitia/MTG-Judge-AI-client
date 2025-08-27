// theme.js
import { createTheme } from "@mui/material/styles"

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4A90E2", // softer blue
    },
    secondary: {
      main: "#F5A623", // orange accent
    },
    background: {
      default: "#FAFAFA", // subtle gray background
      paper: "#FFFFFF",   // cards
    },
    text: {
      primary: "#212121", // softer black
      secondary: "#555555",
    },
  },
})

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90CAF9", // light blue
    },
    secondary: {
      main: "#F48FB1", // pink accent
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#E0E0E0",
      secondary: "#B0B0B0",
    },
  },
})


export {
  lightTheme,
  darkTheme
}