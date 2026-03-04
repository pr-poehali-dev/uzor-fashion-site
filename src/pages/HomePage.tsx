import { products, formatPrice } from "@/data/products";
import Icon from "@/components/ui/icon";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const featured = products.slice(0, 3);

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden grain">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/15c34760-6b11-477a-942a-a3f870c6e9f8.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--background))] via-[hsl(var(--background))]/80 to-transparent" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-24">
          <div className="max-w-xl">
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold animate-fade-up delay-100 mb-6">
              Новая коллекция · 2026
            </p>
            <h1 className="font-display text-6xl lg:text-8xl font-light leading-[1.05] text-foreground animate-fade-up delay-200 mb-6">
              Искусство<br />
              <em className="not-italic text-gold">носить</em><br />
              роскошь
            </h1>
            <p className="font-body text-sm font-light text-[hsl(var(--muted-foreground))] leading-relaxed animate-fade-up delay-300 mb-10 max-w-md">
              UZOR — это не просто одежда. Это манифест утончённости, где каждый шов — произведение искусства.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up delay-400">
              <button className="uzor-btn-fill" onClick={() => onNavigate("catalog")}>
                Смотреть коллекцию
              </button>
              <button className="uzor-btn" onClick={() => onNavigate("about")}>
                О бренде
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={20} className="text-gold opacity-60" />
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-[hsl(var(--border))] py-4 overflow-hidden bg-[hsl(var(--card))]">
        <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="font-display text-xl font-light text-[hsl(var(--muted-foreground))] tracking-widest flex items-center gap-8">
              UZOR <span className="text-gold">✦</span> ЭЛЕГАНТНОСТЬ <span className="text-gold">✦</span> РОСКОШЬ <span className="text-gold">✦</span> СТИЛЬ <span className="text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Featured */}
      <section className="py-24 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="line-accent mb-4 block"></span>
            <h2 className="font-display text-5xl font-light text-foreground">
              Избранное
            </h2>
          </div>
          <button
            onClick={() => onNavigate("catalog")}
            className="font-body text-[10px] tracking-[0.2em] uppercase text-gold hover:opacity-70 transition-opacity flex items-center gap-2"
          >
            Весь каталог <Icon name="ArrowRight" size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((product, i) => (
            <div key={product.id} className={`product-card cursor-pointer delay-${(i + 1) * 100} animate-fade-up`}>
              <div className="relative overflow-hidden aspect-[3/4] bg-[hsl(var(--card))] mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-img w-full h-full object-cover"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 font-body text-[9px] tracking-[0.2em] uppercase bg-gold text-[hsl(var(--background))] px-3 py-1">
                    Новинка
                  </span>
                )}
                {product.isBestseller && (
                  <span className="absolute top-4 left-4 font-body text-[9px] tracking-[0.2em] uppercase bg-[hsl(var(--foreground))] text-[hsl(var(--background))] px-3 py-1">
                    Хит продаж
                  </span>
                )}
              </div>
              <div>
                <p className="font-body text-[10px] tracking-[0.15em] uppercase text-[hsl(var(--muted-foreground))] mb-1">{product.category}</p>
                <h3 className="font-display text-xl font-light text-foreground mb-2">{product.name}</h3>
                <div className="flex items-center gap-3">
                  <span className="font-body text-sm font-medium text-gold">{formatPrice(product.price)}</span>
                  {product.oldPrice && (
                    <span className="font-body text-xs text-[hsl(var(--muted-foreground))] line-through">{formatPrice(product.oldPrice)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy banner */}
      <section className="py-32 bg-[hsl(var(--card))] border-y border-[hsl(var(--border))]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <span className="line-accent mx-auto block mb-8"></span>
          <blockquote className="font-display text-4xl lg:text-6xl font-light leading-tight text-foreground max-w-4xl mx-auto mb-8">
            «Роскошь — это не о цене. Это о{" "}
            <em className="not-italic text-gold">деталях</em>, которых не замечают другие»
          </blockquote>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-[hsl(var(--muted-foreground))]">
            — Философия UZOR
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-14">
          <span className="line-accent mb-4 block"></span>
          <h2 className="font-display text-5xl font-light">Категории</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {["Верхняя одежда", "Вечерние", "Трикотаж", "Пиджаки"].map((cat, i) => (
            <button
              key={cat}
              onClick={() => onNavigate("catalog")}
              className={`relative overflow-hidden aspect-square bg-[hsl(var(--card))] border border-[hsl(var(--border))] group delay-${(i + 1) * 100} animate-fade-up`}
            >
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h3 className="font-display text-xl font-light text-foreground group-hover:text-gold transition-colors">{cat}</h3>
                  <div className="w-0 group-hover:w-8 h-px bg-gold transition-all duration-300 mt-2"></div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--border))] py-12 bg-[hsl(var(--card))]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-display text-2xl tracking-[0.4em] text-gold">UZOR</span>
          <p className="font-body text-xs text-[hsl(var(--muted-foreground))] tracking-widest">
            © 2026 UZOR. Все права защищены.
          </p>
          <div className="flex gap-6">
            {["Instagram", "Telegram", "ВКонтакте"].map(s => (
              <a key={s} href="#" className="font-body text-[10px] tracking-[0.15em] uppercase text-[hsl(var(--muted-foreground))] hover:text-gold transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
