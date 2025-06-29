
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AudioProvider } from "@/contexts/AudioContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AudioProvider>
          <AccessibilityProvider>
            <App />
          </AccessibilityProvider>
        </AudioProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
