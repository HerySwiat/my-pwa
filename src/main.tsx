// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 🔧 Registrar el Service Worker (solo una vez)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      console.log("✅ Service Worker registrado:", reg);
    } catch (err) {
      console.error("❌ Error al registrar el Service Worker:", err);
    }
  });
}
