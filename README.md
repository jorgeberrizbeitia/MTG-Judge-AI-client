
# MTG Judge AI Client

This project is a web frontend part of an AI-powered Magic: The Gathering (MTG) Judge API project. It allows users to ask complex MTG rules questions, select specific cards for context, and receive AI-generated answers with explanations and sources.

- Used alongside this [Server Repo](https://github.com/jorgeberrizbeitia/MTG-Judge-AI)

## Features

- Ask MTG rules questions and get AI-generated answers
- Select and attach specific cards to your question for better context
- Animated typing effect for responses
- View rephrased questions, short answers, full explanations, and sources
- Local history of previous questions and answers

## Technologies Used

- [React](https://react.dev/) (with functional components and hooks)
- [Vite](https://vitejs.dev/) for fast development and build
- [Material UI (MUI)](https://mui.com/) for UI components
- [Axios](https://axios-http.com/) for API requests
- [React Router](https://reactrouter.com/) for a router library
- Custom animated components (e.g., TypingMessage)

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your API endpoint in a `.env.local` file as `VITE_SERVER_URL`
4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `src/components/` – UI components (Navbar, ResponseBox, TypingMessage, etc.)
- `src/pages/` – Main pages (AskQuestion, AllQuestions, Home, etc.)
- `public/` – Static assets

## Extra Links

- [Presentation](https://www.canva.com/design/DAGxWgk3XE4/3Pv1_2CPKRj1pU2cWt35lA/edit?utm_content=DAGxWgk3XE4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
- [Server Repo](https://github.com/jorgeberrizbeitia/MTG-Judge-AI)

---

This project was created as part of the Ironhack Data Science & Machine Learning final project.
