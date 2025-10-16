import { useState, useEffect } from "react";
import HomeScreen from "./components/HomeScreen";
import "./App.css";

function Splash() {
  return (
    <div className="splash-root">
      <div className="splash-content">
        <img src="/icons/logo-512.png" alt="Logo" className="splash-logo" />
        <div className="splash-title">HerySwiat</div>
      </div>
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  
  if (showSplash) return <Splash />;

  return <HomeScreen />;
}
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
