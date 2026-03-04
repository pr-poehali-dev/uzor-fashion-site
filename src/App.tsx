import { useState } from "react";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import CatalogPage from "@/pages/CatalogPage";
import AboutPage from "@/pages/AboutPage";
import ContactsPage from "@/pages/ContactsPage";
import CartPage from "@/pages/CartPage";
import ProfilePage from "@/pages/ProfilePage";
import ReviewsPage from "@/pages/ReviewsPage";

type Page = "home" | "catalog" | "about" | "contacts" | "cart" | "profile" | "reviews";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":     return <HomePage onNavigate={navigate} />;
      case "catalog":  return <CatalogPage />;
      case "about":    return <AboutPage />;
      case "contacts": return <ContactsPage />;
      case "cart":     return <CartPage onNavigate={navigate} />;
      case "profile":  return <ProfilePage />;
      case "reviews":  return <ReviewsPage />;
      default:         return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-foreground">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <div key={currentPage} className="animate-fade-in">
        {renderPage()}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
