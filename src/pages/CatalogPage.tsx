import { useState, useMemo } from "react";
import { products, categories, formatPrice, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Icon from "@/components/ui/icon";

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState<number | null>(null);
  const { addToCart } = useCart();

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter(p => {
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.tags.some(t => t.includes(q));
      const matchCat = activeCategory === "Все" || p.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  const handleAddToCart = (product: Product, size: string) => {
    addToCart(product, size);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 2000);
    setSelectedProduct(null);
    setSelectedSize("");
  };

  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <div className="mb-12">
          <span className="line-accent mb-4 block"></span>
          <h1 className="font-display text-6xl font-light mb-6">Каталог</h1>

          {/* Search */}
          <div className="relative max-w-md">
            <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
            <input
              type="text"
              placeholder="Поиск по названию или тегам..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] pl-10 pr-4 py-3 font-body text-sm text-foreground placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-gold transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-gold"
              >
                <Icon name="X" size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-body text-[10px] tracking-[0.2em] uppercase px-5 py-2 border transition-all duration-200 ${
                activeCategory === cat
                  ? "border-gold bg-gold text-[hsl(var(--background))]"
                  : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-gold hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="font-body text-xs text-[hsl(var(--muted-foreground))] tracking-widest mb-8">
          {filtered.length} {filtered.length === 1 ? "позиция" : filtered.length < 5 ? "позиции" : "позиций"}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <Icon name="Search" size={40} className="text-[hsl(var(--muted-foreground))] mx-auto mb-4" />
            <p className="font-display text-2xl text-[hsl(var(--muted-foreground))]">Ничего не найдено</p>
            <p className="font-body text-sm text-[hsl(var(--muted-foreground))] mt-2">Попробуйте изменить запрос</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(product => (
              <div key={product.id} className="product-card group">
                <div
                  className="relative overflow-hidden aspect-[3/4] bg-[hsl(var(--card))] mb-4 cursor-pointer"
                  onClick={() => { setSelectedProduct(product); setSelectedSize(""); }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-img w-full h-full object-cover"
                  />
                  {product.isNew && (
                    <span className="absolute top-3 left-3 font-body text-[9px] tracking-[0.2em] uppercase bg-gold text-[hsl(var(--background))] px-2 py-1">
                      Новинка
                    </span>
                  )}
                  {product.isBestseller && !product.isNew && (
                    <span className="absolute top-3 left-3 font-body text-[9px] tracking-[0.2em] uppercase bg-foreground text-[hsl(var(--background))] px-2 py-1">
                      Хит
                    </span>
                  )}
                  <div className="absolute inset-0 bg-[hsl(var(--background))]/0 group-hover:bg-[hsl(var(--background))]/30 transition-all duration-300 flex items-center justify-center">
                    <span className="font-body text-[10px] tracking-[0.3em] uppercase text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-foreground px-6 py-2 bg-[hsl(var(--background))]/80">
                      Выбрать
                    </span>
                  </div>
                </div>
                <div>
                  <p className="font-body text-[9px] tracking-[0.15em] uppercase text-[hsl(var(--muted-foreground))] mb-1">{product.category}</p>
                  <h3 className="font-display text-lg font-light text-foreground mb-2 cursor-pointer hover:text-gold transition-colors"
                    onClick={() => { setSelectedProduct(product); setSelectedSize(""); }}
                  >{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-body text-sm font-medium text-gold">{formatPrice(product.price)}</span>
                      {product.oldPrice && (
                        <span className="font-body text-xs text-[hsl(var(--muted-foreground))] line-through">{formatPrice(product.oldPrice)}</span>
                      )}
                    </div>
                    {added === product.id && (
                      <span className="font-body text-[9px] tracking-widest text-gold uppercase">Добавлено ✓</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
          <div className="relative bg-[hsl(var(--background))] border border-[hsl(var(--border))] max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 animate-fade-up max-h-[90vh] overflow-y-auto">
            <div className="aspect-[3/4] md:aspect-auto overflow-hidden">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 flex flex-col gap-4">
              <button
                onClick={() => setSelectedProduct(null)}
                className="self-end text-[hsl(var(--muted-foreground))] hover:text-gold"
              >
                <Icon name="X" size={18} />
              </button>
              <div>
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] mb-1">{selectedProduct.category}</p>
                <h2 className="font-display text-3xl font-light mb-2">{selectedProduct.name}</h2>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-body text-lg font-medium text-gold">{formatPrice(selectedProduct.price)}</span>
                  {selectedProduct.oldPrice && (
                    <span className="font-body text-sm text-[hsl(var(--muted-foreground))] line-through">{formatPrice(selectedProduct.oldPrice)}</span>
                  )}
                </div>
                <p className="font-body text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{selectedProduct.description}</p>
              </div>

              <div>
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] mb-3">Размер</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 font-body text-xs border transition-all ${
                        selectedSize === size
                          ? "border-gold bg-gold text-[hsl(var(--background))]"
                          : "border-[hsl(var(--border))] text-foreground hover:border-gold"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {selectedProduct.tags.map(tag => (
                  <span key={tag} className="font-body text-[9px] tracking-widest uppercase text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] px-2 py-1">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                disabled={!selectedSize}
                onClick={() => handleAddToCart(selectedProduct, selectedSize)}
                className={`mt-auto uzor-btn-fill w-full text-center ${!selectedSize ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                {selectedSize ? "Добавить в корзину" : "Выберите размер"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
