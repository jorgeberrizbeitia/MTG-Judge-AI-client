import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@mui/material"

import { Link } from "react-router-dom"

import whiteMana from "../assets/images/mana-white.png"
import blackMana from "../assets/images/mana-black.png"
import greenMana from "../assets/images/mana-green.png"
import redMana from "../assets/images/mana-red.png"
import blueMana from "../assets/images/mana-blue.png"

function Home() {
  return (
    <div className="fade-in">
      
      {/* Instructions with collapsible */}
      
      <Card sx={{m: 2}}>
        <CardContent>
          <Typography gutterBottom variant="h4">Welcome to your AI MTG Judge assistant</Typography>
          <Typography gutterBottom variant="subtitle1">Here you can ask any Magic The Gathering related question.</Typography>
          <Typography gutterBottom variant="subtitle1">Anything from rules, abilities or card interactions.</Typography>
          
        </CardContent>
      </Card>

      <Card sx={{m: 2, position: "relative", overflow: "visible"}}>
        <CardContent>
          <Typography variant="h5" sx={{ m: 1 }}>Recommendations:</Typography>
          
          <List dense>
            <ListItem>
              <img src={whiteMana} alt="mana-logo" style={{width: "25px", margin: "5px"}}/>
              <ListItemText primary="Be as precise and clear with your question as possible. Use keywords and card types." />
            </ListItem>

            <ListItem>
              <img src={blackMana} alt="mana-logo" style={{width: "25px", margin: "5px"}}/>
              <ListItemText primary="If mentioning specific cards, type the card names inside [square brackets]" />
            </ListItem>

            <ListItem>
              <img src={greenMana} alt="mana-logo" style={{width: "25px", margin: "5px"}}/>
              <ListItemText primary="Autocomplete will suggest from the available cards list" />
            </ListItem>

            <ListItem>
              <img src={redMana} alt="mana-logo" style={{width: "25px", margin: "5px"}}/>
              <ListItemText primary="Click a suggestion to insert and fetch detail and continue writing your question normally" />
            </ListItem>

            <ListItem>
              <img src={blueMana} alt="mana-logo" style={{width: "25px", margin: "5px"}}/>
              <ListItemText primary="Avoid questions about pricing, products, tournament settings and any non-MTG related question" />
            </ListItem>

          </List>
        </CardContent>

        <Box as={Link} to={"/ask-question"} sx={{position: "absolute", top: "20%", right: -100, rotate: "20deg"}}>
          <Button variant="contained" sx={{fontSize: 20, width: 200, height: 200, borderRadius: 50}}>Ask Your Question!</Button>
        </Box>
      </Card>


    </div>
  )
}
export default Home