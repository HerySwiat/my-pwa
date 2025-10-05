// // src/components/HomeScreen.tsx
// import React from "react";

// const HomeScreen: React.FC = () => {
//   return (
//     <div className="home-container">
//       <header className="home-header">
//         <h1>Mi Tienda</h1>
//         <nav>
//           <a href="#">Inicio</a>
//           <a href="#">Productos</a>
//           <a href="#">Ofertas</a>
//           <a href="#">Contacto</a>
//         </nav>
//       </header>

//       <main className="home-main">
//         <section className="hero">
//           <h2>Descubre nuestras colecciones</h2>
//           <p>Encuentra el estilo perfecto o tu próxima lectura favorita.</p>
//           <button>Explorar ahora</button>
//         </section>

//         <section className="featured">
//           <h3>Destacados</h3>
//           <div className="items-grid">
//             <div className="item-card">
//               <img src="/assets/img1.png" alt="Producto 1" />
//               <h4>Título del producto</h4>
//               <p>$199 MXN</p>
//             </div>
//             <div className="item-card">
//               <img src="/assets/img2.png" alt="Producto 2" />
//               <h4>Título del producto</h4>
//               <p>$299 MXN</p>
//             </div>
//             <div className="item-card">
//               <img src="/assets/img3.png" alt="Producto 3" />
//               <h4>Título del producto</h4>
//               <p>$399 MXN</p>
//             </div>
//           </div>
//         </section>
//       </main>

//       <footer className="home-footer">
//         <p>© 2025 Mi Tienda. Todos los derechos reservados.</p>
//       </footer>
//     </div>
//   );
// };

// export default HomeScreen;
// src/components/HomeScreen.tsx
// import React from "react";
import HeroSection from "./HeroSection";
import CategorySection from "./CategorySection";
import ProductGrid from "./ProductGrid";

export default function HomeScreen() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <ProductGrid />
      <footer className="footer">
        © 2025 HerySwiat. Inspirado en la elegancia del misterio.
      </footer>
    </>
  );
}
