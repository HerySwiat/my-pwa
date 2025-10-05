// src/components/CategorySection.tsx
import React from "react";
import "./CategorySection.css";

const categories = [
  { name: "Ropa", image: "/img/sample1.jpg" },
  { name: "Libros", image: "/img/sample2.jpg" },
  { name: "Accesorios", image: "/img/sample3.jpg" },
];

const CategorySection: React.FC = () => {
  return (
    <section className="categories">
      <h2>Categorías destacadas</h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <div key={cat.name} className="category-card">
            <img src={cat.image} alt={cat.name} />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
