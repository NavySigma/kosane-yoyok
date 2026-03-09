import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css' // Import Tailwind CSS
import App from './App'
import { LanguageProvider } from "./context/LanguageContext";

import "./styles/animation.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)