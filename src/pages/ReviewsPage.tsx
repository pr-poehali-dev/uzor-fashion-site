import { useState } from "react";
import Icon from "@/components/ui/icon";

const reviews = [
  { id: 1, name: "Анастасия М.", city: "Москва", rating: 5, product: "Пальто «Нуар»", text: "Совершенно влюбилась в это пальто. Качество кашемира просто невероятное — ткань невесомая, но тёплая. Крой идеальный, как будто шили специально на меня. Это моя третья вещь от UZOR, и каждый раз они превосходят ожидания.", date: "Февраль 2026" },
  { id: 2, name: "Елена К.", city: "Санкт-Петербург", rating: 5, product: "Платье «Soir»", text: "Надела платье на корпоратив — весь вечер принимала комплименты. Шёлк невероятно приятный к телу, вышивка выполнена с ювелирной точностью. UZOR — это уровень.", date: "Январь 2026" },
  { id: 3, name: "Виктория Р.", city: "Екатеринбург", rating: 5, product: "Водолазка «Essentia»", text: "Мой новый базовый гардероб строится вокруг этой водолазки. Мериносовая шерсть высшего класса, совершенно не колется. Уже заказала в двух цветах.", date: "Март 2026" },
  { id: 4, name: "Дарья П.", city: "Казань", rating: 4, product: "Жакет «Atelier»", text: "Жакет восхитительный, итальянская шерсть ощущается буквально при первом прикосновении. Чуть изменила бы лацканы под свои предпочтения, но в остальном — абсолютный шедевр.", date: "Февраль 2026" },
  { id: 5, name: "Мария С.", city: "Новосибирск", rating: 5, product: "Юбка «Velours»", text: "Бархат такого качества я не видела даже в европейских бутиках. Посадка, разрез, подкладка — всё продумано до мелочей. UZOR знает толк в роскоши.", date: "Январь 2026" },
  { id: 6, name: "Ольга Т.", city: "Сочи", rating: 5, product: "Кардиган «Calm»", text: "Заказала как домашний кардиган, но он настолько роскошный, что надеваю его куда угодно. Кашемировая смесь мягкая как облако. Доставка была в срок, упаковка — как подарок.", date: "Декабрь 2025" },
];

export default function ReviewsPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", city: "", product: "", text: "", rating: 5 });

  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <span className="line-accent mb-4 block"></span>
            <h1 className="font-display text-6xl font-light">Отзывы</h1>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="font-display text-5xl font-light text-gold">{avg}</div>
              <div className="flex gap-1 justify-center mt-1">
                {Array(5).fill(null).map((_, i) => (
                  <Icon key={i} name="Star" size={12} className="text-gold fill-current" />
                ))}
              </div>
              <p className="font-body text-[9px] tracking-widest uppercase text-[hsl(var(--muted-foreground))] mt-1">{reviews.length} отзывов</p>
            </div>
            <button className="uzor-btn-fill" onClick={() => setShowForm(!showForm)}>
              Написать отзыв
            </button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="border border-gold p-8 mb-12 animate-fade-up">
            <h2 className="font-display text-2xl font-light mb-6">Ваш отзыв</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-[hsl(var(--muted-foreground))]"
                placeholder="Ваше имя"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
              <input
                className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-[hsl(var(--muted-foreground))]"
                placeholder="Город"
                value={form.city}
                onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
              />
            </div>
            <input
              className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-[hsl(var(--muted-foreground))] mb-4"
              placeholder="Название товара"
              value={form.product}
              onChange={e => setForm(f => ({ ...f, product: e.target.value }))}
            />
            <div className="flex gap-2 mb-4">
              <span className="font-body text-xs text-[hsl(var(--muted-foreground))] self-center">Оценка:</span>
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => setForm(f => ({ ...f, rating: n }))}>
                  <Icon name="Star" size={20} className={n <= form.rating ? "text-gold fill-current" : "text-[hsl(var(--muted-foreground))]"} />
                </button>
              ))}
            </div>
            <textarea
              className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-[hsl(var(--muted-foreground))] mb-4 h-32 resize-none"
              placeholder="Расскажите о вашем опыте..."
              value={form.text}
              onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
            />
            <div className="flex gap-4">
              <button className="uzor-btn-fill">Отправить отзыв</button>
              <button className="uzor-btn" onClick={() => setShowForm(false)}>Отмена</button>
            </div>
          </div>
        )}

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(review => (
            <div key={review.id} className="border border-[hsl(var(--border))] p-6 hover:border-gold/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-display text-xl font-light">{review.name}</h3>
                  <p className="font-body text-[9px] tracking-widest uppercase text-[hsl(var(--muted-foreground))]">{review.city}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array(review.rating).fill(null).map((_, i) => (
                    <Icon key={i} name="Star" size={12} className="text-gold fill-current" />
                  ))}
                </div>
              </div>
              <p className="font-body text-[10px] tracking-[0.15em] uppercase text-gold mb-3">{review.product}</p>
              <p className="font-body text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">"{review.text}"</p>
              <p className="font-body text-[9px] tracking-widest uppercase text-[hsl(var(--muted-foreground))]">{review.date}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-[hsl(var(--border))] py-12 bg-[hsl(var(--card))]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-display text-2xl tracking-[0.4em] text-gold">UZOR</span>
          <p className="font-body text-xs text-[hsl(var(--muted-foreground))] tracking-widest">© 2026 UZOR. Все права защищены.</p>
        </div>
      </footer>
    </main>
  );
}
