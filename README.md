# Gemini AI Interactive Web Chatbot

A sleek, responsive, and fully interactive conversational web application powered by the Google Gemini API. Built completely with vanilla web technologies, this chatbot features dynamic UI rendering, theme toggling, and local storage management.

## Features
- Real-time AI Responses: Integrated with Google's gemini-3.6-flash model for fast, accurate text generation.
- Markdown Support: Parses API responses using marked.js to render bold text, bullet points, and code blocks cleanly.
- Dynamic UI State: Features a CSS-animated skeleton loading state (shimmering bars and spinning avatar) while awaiting API network responses.
- Dark/Light Mode: Includes a fully functional theme toggle that stores user preferences persistently in the browser.
- Chat Memory: Automatically saves chat history using the browser's localStorage so conversations persist across page reloads. Includes a one-click deletion feature to wipe history.

## Tech Stack
- Frontend: HTML5, CSS3 (CSS Variables, Flexbox, Keyframes), Vanilla JavaScript (ES6+)
- API/Network: REST API Integration via fetch standard, Async/Await
- Libraries/Icons: Marked.js (Markdown parsing), Google Material Symbols

## How to Run Locally
1. Clone this repository to your local machine:
   ```bash
   git clone [https://github.com/tiwariaditya2016/MY_AI_CHATBOT.git](https://github.com/tiwariaditya2016/MY_AI_CHATBOT.git)