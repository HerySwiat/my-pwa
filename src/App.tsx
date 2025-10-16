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