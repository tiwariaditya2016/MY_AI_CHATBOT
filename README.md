# Gemini AI Interactive Web Chatbot

A sleek, responsive, and fully interactive conversational web application powered by the Google Gemini API. Built completely with vanilla web technologies, this chatbot features dynamic UI rendering, theme toggling, persistent chat history, and responsive mobile adaptations.

---

## Features

- **Real-Time AI Responses:** Integrated with Google's Gemini models for fast, contextual text generation.
- **Simulated Streaming (Typewriter Effect):** Smooth word-by-word typing animation for incoming model outputs.
- **Markdown & Code Formatting:** Parses responses cleanly using `marked.js` to render headers, bullet points, and code blocks.
- **Dynamic Loading Animations:** Custom CSS-animated shimmer bars and avatar rotations provide visual feedback while network requests are pending.
- **Dark/Light Mode:** Seamless theme switching with user preference saved persistently across visits.
- **Persistent Chat History:** Conversations automatically persist via the browser's `localStorage` API. Includes a one-click action to clear saved history and restore the greeting interface.
- **Interactive Suggestions:** One-click prompt cards that let users initiate chats immediately.
- **Clipboard Utility:** Single-click copy action on bot responses with instant status feedback.
- **Fully Responsive Design:** Tailored UI adjustments via custom CSS media queries for desktop, tablet, and mobile screens.

---

## Tech Stack

- **Frontend:** HTML5, CSS3 (CSS Variables, Flexbox, Keyframes, Media Queries), Vanilla JavaScript (ES6+)
- **API & Networking:** Google Gemini API via native `fetch()` with `async/await`
- **Libraries & Icons:** [marked.js](https://cdn.jsdelivr.net/npm/marked/marked.min.js), Google Fonts (Poppins), Google Material Symbols Rounded

---

## Project Structure

```text
├── index.html          # Semantic layout and interface markup
├── style.css           # Styling, animations, theme tokens, and media queries
├── script.js           # Event handling, API communication, and state management
├── gemini-color.svg    # Assistant profile icon
├── photo.jpeg          # User avatar placeholder
└── README.md           # Documentation
## How to Run Locally
1. Clone this repository to your local machine:
   ```bash
   git clone [https://github.com/tiwariaditya2016/MY_AI_CHATBOT.git](https://github.com/tiwariaditya2016/MY_AI_CHATBOT.git)