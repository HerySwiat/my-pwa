// src/components/HeroSection.tsx
import React from "react";
import "./HeroSection.css";

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Explora la nueva colección</h1>
        <p>Encuentra inspiración en cada detalle.</p>
        <button>Ver colección</button>
      </div>
    </section>
  );
};

export default HeroSection;
