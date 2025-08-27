import { AppBar, Toolbar, Button, Box } from "@mui/material"
import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from "../assets/images/logo.png"

import { IconButton, Tooltip } from "@mui/material"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"

function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar sx={{ gap: 2, justifyContent: "center", position: "relative" }}>
        <Box 
          component="img"
          sx={{position: "absolute", left: 10, width: 40, filter: location.pathname === "/" ? "drop-shadow(0 0 0.75rem #1976d3)" : "none"}}
          alt="logo"
          onClick={() => navigate("/")}
          src={logo}
        />
        <Button
          component={Link}
          to="/ask-question"
          variant={location.pathname === "/ask-question" ? "contained" : "text"}
          color="primary"
        >
          Ask a Question
        </Button>
        <Button
          component={Link}
          to="/all-questions"
          variant={location.pathname === "/all-questions" ? "contained" : "text"}
          color="primary"
        >
          Question History
        </Button>
        <Tooltip title="Toggle light/dark mode" sx={{position: "absolute", right: 10}}>
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
