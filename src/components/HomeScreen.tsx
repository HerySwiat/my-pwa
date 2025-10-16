import HeroSection from "./HeroSection";
import CategorySection from "./CategorySection";
import ProductGrid from "./ProductGrid";
import OfflineForm from "./OfflineForm";
import NotificationTester from "./NotificationTester";
import "./Footer.css"; // ✅ Importar CSS del footer

export default function HomeScreen() {
  return (
    <>
      <HeroSection />
      <OfflineForm />
      <NotificationTester/>
      <CategorySection />
      <ProductGrid />
      <footer className="footer">
        © 2025 HerySwiat. Inspirado en la elegancia del misterio.
      </footer>
    </>
  );
}
