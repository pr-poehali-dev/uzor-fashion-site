import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import Icon from "@/components/ui/icon";

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export default function CartPage({ onNavigate }: CartPageProps) {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon name="ShoppingBag" size={60} className="text-[hsl(var(--muted-foreground))] mx-auto mb-6" />
          <h1 className="font-display text-4xl font-light mb-4">Корзина пуста</h1>
          <p className="font-body text-sm text-[hsl(var(--muted-foreground))] mb-8">Добавьте что-нибудь из нашей коллекции</p>
          <button className="uzor-btn-fill" onClick={() => onNavigate("catalog")}>
            Перейти в каталог
          </button>
        </div>
      </main>
    );
  }

  const shipping = totalPrice >= 50000 ? 0 : 990;

  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="mb-12">
          <span className="line-accent mb-4 block"></span>
          <div className="flex items-end justify-between">
            <h1 className="font-display text-6xl font-light">Корзина</h1>
            <button
              onClick={clearCart}
              className="font-body text-[10px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] hover:text-destructive transition-colors flex items-center gap-2"
            >
              <Icon name="Trash2" size={14} /> Очистить
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {items.map(item => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-6 border-b border-[hsl(var(--border))] pb-6 animate-fade-in"
              >
                <div className="w-24 h-32 bg-[hsl(var(--card))] overflow-hidden flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-body text-[9px] tracking-[0.15em] uppercase text-[hsl(var(--muted-foreground))]">{item.product.category}</p>
                      <h3 className="font-display text-xl font-light">{item.product.name}</h3>
                      <p className="font-body text-xs text-[hsl(var(--muted-foreground))] mt-1">Размер: {item.size}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      className="text-[hsl(var(--muted-foreground))] hover:text-destructive transition-colors"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-[hsl(var(--border))]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-gold transition-colors"
                      >
                        <Icon name="Minus" size={12} />
                      </button>
                      <span className="w-9 h-9 flex items-center justify-center font-body text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-gold transition-colors"
                      >
                        <Icon name="Plus" size={12} />
                      </button>
                    </div>
                    <span className="font-body text-sm font-medium text-gold">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="border border-[hsl(var(--border))] p-8 sticky top-24">
              <h2 className="font-display text-2xl font-light mb-6">Итого</h2>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-[hsl(var(--muted-foreground))]">Товары</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-[hsl(var(--muted-foreground))]">Доставка</span>
                  <span className={shipping === 0 ? "text-gold" : ""}>{shipping === 0 ? "Бесплатно" : formatPrice(shipping)}</span>
                </div>
                {shipping === 0 && (
                  <p className="font-body text-[9px] tracking-widest uppercase text-gold">
                    ✓ Бесплатная доставка от 50 000 ₽
                  </p>
                )}
                {shipping !== 0 && (
                  <p className="font-body text-[9px] text-[hsl(var(--muted-foreground))]">
                    Бесплатная доставка от {formatPrice(50000)}
                  </p>
                )}
              </div>

              <div className="border-t border-[hsl(var(--border))] pt-4 mb-8">
                <div className="flex justify-between font-body text-base">
                  <span>К оплате</span>
                  <span className="text-gold font-medium">{formatPrice(totalPrice + shipping)}</span>
                </div>
              </div>

              <button className="uzor-btn-fill w-full mb-4">
                Оформить заказ
              </button>
              <button
                className="uzor-btn w-full"
                onClick={() => onNavigate("catalog")}
              >
                Продолжить покупки
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
