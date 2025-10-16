// src/components/ProductGrid.tsx
import React from "react";
import "./ProductGrid.css";

// Estructura de producto
const baseProducts = [
  {
    id: 1,
    name: "Producto 1",
    price: "$25.00",
    image: "/img/sample1.jpg",
  },
  {
    id: 2,
    name: "Producto 2",
    price: "$28.00",
    image: "/img/sample2.jpg",
  },
  {
    id: 3,
    name: "Producto 3",
    price: "$28.00",
    image: "/img/sample3.jpg",
  },
];

// Repite los productos 3 veces
const products = Array.from({ length: 13
 })
  .flatMap((_, i) =>
    baseProducts.map((p) => ({
      ...p,
      id: i * baseProducts.length + p.id, // id único
    }))
  );

const ProductGrid: React.FC = () => {
  return (
    <section className="product-grid">
      <h2>Nuestros productos</h2>
      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
