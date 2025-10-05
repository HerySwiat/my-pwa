import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // usa tu CSS base

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registrar el Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("✅ Workbox SW registrado:", reg))
      .catch((err) => console.error("❌ Error SW:", err));
  });
}
