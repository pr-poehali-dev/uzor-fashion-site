import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import Icon from "@/components/ui/icon";

interface CartPageProps {
  onNavigate: (page: string) => void;
}

type Step = "cart" | "checkout" | "success";

export default function CartPage({ onNavigate }: CartPageProps) {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [payMethod, setPayMethod] = useState<"card" | "transfer">("card");
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", card: "", expiry: "", cvv: "" });
  const [orderNum] = useState(() => "UZ-" + Math.floor(10000 + Math.random() * 90000));

  const shipping = totalPrice >= 5000 ? 0 : 350;
  const total = totalPrice + shipping;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
    clearCart();
  };

  const formatCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v: string) => v.replace(/\D/g, "").slice(0, 4).replace(/(.{2})/, "$1/");

  if (step === "success") {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-6 animate-fade-up">
          <div className="w-16 h-16 border border-gold flex items-center justify-center mx-auto mb-6">
            <Icon name="Check" size={28} className="text-gold" />
          </div>
          <h1 className="font-display text-4xl font-light mb-4">Заказ оформлен</h1>
          <p className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-2">#{orderNum}</p>
          <p className="font-body text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-8">
            Мы получили ваш заказ и уже начали его обрабатывать. Подтверждение придёт на {form.email || "вашу почту"} в течение нескольких минут.
          </p>
          <button className="uzor-btn-fill" onClick={() => { setStep("cart"); onNavigate("catalog"); }}>
            Вернуться в каталог
          </button>
        </div>
      </main>
    );
  }

  if (items.length === 0 && step === "cart") {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon name="ShoppingBag" size={60} className="text-[hsl(var(--muted-foreground))] mx-auto mb-6" />
          <h1 className="font-display text-4xl font-light mb-4">Корзина пуста</h1>
          <p className="font-body text-sm text-[hsl(var(--muted-foreground))] mb-8">Добавьте что-нибудь из нашей коллекции</p>
          <button className="uzor-btn-fill" onClick={() => onNavigate("catalog")}>Перейти в каталог</button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">

        {/* Steps indicator */}
        <div className="flex items-center gap-4 mb-12">
          {[{ id: "cart", label: "Корзина" }, { id: "checkout", label: "Оформление" }].map((s, i) => (
            <div key={s.id} className="flex items-center gap-4">
              {i > 0 && <div className={`w-12 h-px ${step === "checkout" ? "bg-gold" : "bg-[hsl(var(--border))]"}`} />}
              <button
                onClick={() => s.id === "cart" && setStep("cart")}
                className={`flex items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase ${
                  step === s.id ? "text-gold" : "text-[hsl(var(--muted-foreground))]"
                }`}
              >
                <span className={`w-6 h-6 border flex items-center justify-center text-[10px] ${
                  step === s.id ? "border-gold text-gold" : "border-[hsl(var(--border))]"
                }`}>{i + 1}</span>
                {s.label}
              </button>
            </div>
          ))}
        </div>

        {step === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-end justify-between mb-8">
                <h1 className="font-display text-5xl font-light">Корзина</h1>
                <button onClick={clearCart} className="font-body text-[10px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] hover:text-destructive transition-colors flex items-center gap-2">
                  <Icon name="Trash2" size={13} /> Очистить
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-6 border-b border-[hsl(var(--border))] pb-6">
                    <div className="w-24 h-32 bg-[hsl(var(--card))] overflow-hidden flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-body text-[9px] tracking-[0.15em] uppercase text-[hsl(var(--muted-foreground))]">{item.product.category}</p>
                          <h3 className="font-display text-xl font-light">{item.product.name}</h3>
                          <p className="font-body text-xs text-[hsl(var(--muted-foreground))] mt-0.5">Размер: {item.size}</p>
                          {item.product.embroidery && (
                            <p className="font-body text-[9px] text-gold tracking-widest mt-0.5">✦ {item.product.embroidery}</p>
                          )}
                        </div>
                        <button onClick={() => removeFromCart(item.product.id, item.size)} className="text-[hsl(var(--muted-foreground))] hover:text-destructive transition-colors">
                          <Icon name="X" size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border border-[hsl(var(--border))]">
                          <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-gold">
                            <Icon name="Minus" size={12} />
                          </button>
                          <span className="w-9 h-9 flex items-center justify-center font-body text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-gold">
                            <Icon name="Plus" size={12} />
                          </button>
                        </div>
                        <span className="font-body text-sm font-medium text-gold">{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
                  <p className="font-body text-[9px] text-[hsl(var(--muted-foreground))]">
                    {shipping === 0 ? "✓ Бесплатная доставка" : `Бесплатно от ${formatPrice(5000)}`}
                  </p>
                </div>
                <div className="border-t border-[hsl(var(--border))] pt-4 mb-8">
                  <div className="flex justify-between font-body text-base">
                    <span>К оплате</span>
                    <span className="text-gold font-medium">{formatPrice(total)}</span>
                  </div>
                </div>
                <button className="uzor-btn-fill w-full mb-4" onClick={() => setStep("checkout")}>
                  Перейти к оформлению
                </button>
                <button className="uzor-btn w-full" onClick={() => onNavigate("catalog")}>Продолжить покупки</button>
              </div>
            </div>
          </div>
        )}

        {step === "checkout" && (
          <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <h2 className="font-display text-3xl font-light mb-6">Данные для доставки</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "name", label: "Имя и фамилия", type: "text", placeholder: "Анна Иванова", required: true },
                    { key: "phone", label: "Телефон", type: "tel", placeholder: "+7 (999) 000-00-00", required: true },
                    { key: "email", label: "Email", type: "email", placeholder: "email@mail.ru", required: true },
                  ].map(f => (
                    <div key={f.key} className={f.key === "address" ? "md:col-span-2" : ""}>
                      <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">{f.label}</label>
                      <input
                        type={f.type}
                        required={f.required}
                        placeholder={f.placeholder}
                        className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                        value={form[f.key as keyof typeof form]}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Адрес доставки</label>
                    <input
                      type="text"
                      required
                      placeholder="Город, улица, дом, квартира"
                      className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                      value={form.address}
                      onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display text-3xl font-light mb-6">Способ оплаты</h2>

                <div className="flex gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setPayMethod("card")}
                    className={`flex-1 py-4 border font-body text-xs tracking-[0.15em] uppercase transition-all flex items-center justify-center gap-2 ${
                      payMethod === "card" ? "border-gold text-gold" : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]"
                    }`}
                  >
                    <Icon name="CreditCard" size={16} /> Банковская карта
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayMethod("transfer")}
                    className={`flex-1 py-4 border font-body text-xs tracking-[0.15em] uppercase transition-all flex items-center justify-center gap-2 ${
                      payMethod === "transfer" ? "border-gold text-gold" : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]"
                    }`}
                  >
                    <Icon name="Smartphone" size={16} /> По номеру карты
                  </button>
                </div>

                {payMethod === "card" && (
                  <div className="border border-[hsl(var(--border))] p-6 flex flex-col gap-4">
                    <div>
                      <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Номер карты</label>
                      <input
                        type="text"
                        required
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        className="w-full bg-[hsl(var(--background))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors tracking-widest"
                        value={form.card}
                        onChange={e => setForm(p => ({ ...p, card: formatCard(e.target.value) }))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Срок действия</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full bg-[hsl(var(--background))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                          value={form.expiry}
                          onChange={e => setForm(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                        />
                      </div>
                      <div>
                        <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">CVV / CVC</label>
                        <input
                          type="password"
                          required
                          placeholder="•••"
                          maxLength={3}
                          className="w-full bg-[hsl(var(--background))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                          value={form.cvv}
                          onChange={e => setForm(p => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) }))}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                      <Icon name="Lock" size={12} />
                      <span className="font-body text-[9px] tracking-widest">Защищено SSL-шифрованием</span>
                    </div>
                  </div>
                )}

                {payMethod === "transfer" && (
                  <div className="border border-[hsl(var(--border))] p-6">
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-gold mb-4">Перевод с карты на карту</p>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center py-3 border-b border-[hsl(var(--border))]">
                        <span className="font-body text-xs text-[hsl(var(--muted-foreground))]">Номер карты</span>
                        <span className="font-body text-sm font-medium tracking-widest">2200 7007 4488 XXXX</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-[hsl(var(--border))]">
                        <span className="font-body text-xs text-[hsl(var(--muted-foreground))]">Получатель</span>
                        <span className="font-body text-sm">UZOR Brand</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="font-body text-xs text-[hsl(var(--muted-foreground))]">Сумма</span>
                        <span className="font-body text-sm font-medium text-gold">{formatPrice(total)}</span>
                      </div>
                    </div>
                    <p className="font-body text-[9px] text-[hsl(var(--muted-foreground))] mt-4 leading-relaxed">
                      После перевода отправьте скриншот в Telegram или на почту — мы подтвердим заказ вручную.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="border border-[hsl(var(--border))] p-8 sticky top-24">
                <h2 className="font-display text-2xl font-light mb-6">Ваш заказ</h2>
                <div className="flex flex-col gap-4 mb-6">
                  {items.map(item => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-3 items-center">
                      <div className="w-14 h-14 bg-[hsl(var(--card))] overflow-hidden flex-shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-sm font-light truncate">{item.product.name}</p>
                        <p className="font-body text-[9px] text-[hsl(var(--muted-foreground))]">{item.size} · {item.quantity} шт.</p>
                      </div>
                      <span className="font-body text-xs text-gold">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[hsl(var(--border))] pt-4 flex flex-col gap-2 mb-8">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-[hsl(var(--muted-foreground))]">Доставка</span>
                    <span>{shipping === 0 ? "Бесплатно" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between font-body text-base font-medium">
                    <span>Итого</span>
                    <span className="text-gold">{formatPrice(total)}</span>
                  </div>
                </div>
                <button type="submit" className="uzor-btn-fill w-full">
                  {payMethod === "card" ? "Оплатить" : "Подтвердить заказ"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
