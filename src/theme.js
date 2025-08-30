// theme.js
import { createTheme } from "@mui/material/styles";

const getCommonOverrides = (theme) => ({
  styleOverrides: {
    body: {
      transition: theme.transitions.create(
        ["background-color", "color"],
        {
          duration: theme.transitions.duration.standard,
        }
      ),
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#4A90E2" },
    secondary: { main: "#F5A623" },
    background: { default: "#FAFAFA", paper: "#FFFFFF" },
    text: { primary: "#212121", secondary: "#555555" },
  },
});
lightTheme.components = {
  MuiCssBaseline: getCommonOverrides(lightTheme),
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90CAF9" },
    secondary: { main: "#F48FB1" },
    background: { default: "#121212", paper: "#1E1E1E" },
    text: { primary: "#E0E0E0", secondary: "#B0B0B0" },
  },
});
darkTheme.components = {
  MuiCssBaseline: getCommonOverrides(darkTheme),
};

export { lightTheme, darkTheme };
