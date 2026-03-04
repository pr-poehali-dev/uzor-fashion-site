import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useCart } from "@/context/CartContext";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "about", label: "О бренде" },
  { id: "reviews", label: "Отзывы" },
  { id: "contacts", label: "Контакты" },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { totalCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/90 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate("home")}
          className="font-display text-2xl font-light tracking-[0.4em] text-gold hover:opacity-80 transition-opacity"
        >
          UZOR
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`font-body text-[10px] tracking-[0.2em] uppercase transition-all duration-200 ${
                currentPage === link.id
                  ? "text-gold"
                  : "text-[hsl(var(--muted-foreground))] hover:text-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate("catalog")}
            className="text-[hsl(var(--muted-foreground))] hover:text-gold transition-colors"
            aria-label="Поиск"
          >
            <Icon name="Search" size={18} />
          </button>
          <button
            onClick={() => onNavigate("profile")}
            className="text-[hsl(var(--muted-foreground))] hover:text-gold transition-colors"
            aria-label="Профиль"
          >
            <Icon name="User" size={18} />
          </button>
          <button
            onClick={() => onNavigate("cart")}
            className="relative text-[hsl(var(--muted-foreground))] hover:text-gold transition-colors"
            aria-label="Корзина"
          >
            <Icon name="ShoppingBag" size={18} />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-[hsl(var(--background))] text-[9px] font-body font-semibold flex items-center justify-center rounded-full">
                {totalCount}
              </span>
            )}
          </button>

          {/* Burger */}
          <button
            className="md:hidden text-[hsl(var(--muted-foreground))] hover:text-gold transition-colors ml-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] animate-fade-in">
          <nav className="flex flex-col px-6 py-6 gap-5">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => { onNavigate(link.id); setMenuOpen(false); }}
                className={`font-body text-xs tracking-[0.2em] uppercase text-left transition-colors ${
                  currentPage === link.id ? "text-gold" : "text-[hsl(var(--muted-foreground))]"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
