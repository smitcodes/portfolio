import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";

const root = document.getElementById("root");

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register the offline service worker for production builds only.
// BASE_URL keeps the path correct on sub-path deploys (e.g. /portfolio/).
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {
      /* offline support is a nice-to-have — never break the page over it */
    });
  });
}