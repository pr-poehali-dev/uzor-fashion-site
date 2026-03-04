import { useState } from "react";
import Icon from "@/components/ui/icon";

const garmentTypes = ["Футболка", "Лонгслив", "Худи", "Свитшот"];
const embroideryPositions = ["На груди (центр)", "На груди (левый карман)", "На спине", "На рукаве", "На вороте"];
const colors = [
  { name: "Белый", value: "#F5F0E8" },
  { name: "Чёрный", value: "#1A1A1A" },
  { name: "Серый", value: "#6B7280" },
  { name: "Бежевый", value: "#C8A96E" },
  { name: "Тёмно-синий", value: "#1E2A4A" },
];

export default function CustomDesignPage() {
  const [form, setForm] = useState({
    garment: "",
    size: "",
    color: "",
    position: "",
    description: "",
    name: "",
    phone: "",
    email: "",
    quantity: "1",
    referenceUrl: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">

        {/* Header */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div>
            <span className="line-accent mb-4 block"></span>
            <h1 className="font-display text-6xl lg:text-7xl font-light leading-tight">
              Свой<br /><em className="not-italic text-gold">дизайн</em>
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-body text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              Закажи вещь с вышивкой по твоему эскизу или идее. Мы воплотим любой образ — логотип, орнамент, надпись, портрет — в ручной вышивке на выбранном изделии.
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                { icon: "Scissors", text: "Ручная вышивка" },
                { icon: "Clock", text: "7–14 дней" },
                { icon: "Package", text: "От 1 штуки" },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2">
                  <Icon name={item.icon as "Scissors"} size={14} className="text-gold" />
                  <span className="font-body text-xs text-[hsl(var(--muted-foreground))]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            { type: "Футболка", price: "от 800 ₽", note: "базовая цена + вышивка" },
            { type: "Лонгслив", price: "от 1 200 ₽", note: "базовая цена + вышивка" },
            { type: "Кофта / Худи", price: "от 2 200 ₽", note: "базовая цена + вышивка" },
          ].map(item => (
            <div key={item.type} className="border border-[hsl(var(--border))] p-6 hover:border-gold/50 transition-colors">
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] mb-2">{item.type}</p>
              <p className="font-display text-3xl font-light text-gold mb-1">{item.price}</p>
              <p className="font-body text-[9px] text-[hsl(var(--muted-foreground))]">{item.note}</p>
            </div>
          ))}
        </div>

        {sent ? (
          <div className="border border-gold p-12 text-center animate-fade-up max-w-lg mx-auto">
            <div className="w-16 h-16 border border-gold flex items-center justify-center mx-auto mb-6">
              <Icon name="Check" size={28} className="text-gold" />
            </div>
            <h2 className="font-display text-3xl font-light mb-3">Заявка отправлена</h2>
            <p className="font-body text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              Мы свяжемся с вами в течение 24 часов, уточним детали вышивки и сообщим итоговую стоимость.
            </p>
            <button className="uzor-btn mt-6" onClick={() => setSent(false)}>
              Оставить ещё заявку
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-light">Параметры изделия</h2>

              {/* Garment type */}
              <div>
                <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-3">Тип изделия *</label>
                <div className="grid grid-cols-2 gap-2">
                  {garmentTypes.map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, garment: g }))}
                      className={`py-3 border font-body text-xs tracking-[0.15em] uppercase transition-all ${
                        form.garment === g ? "border-gold text-gold" : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-gold/50"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-3">Цвет изделия *</label>
                <div className="flex gap-3 flex-wrap">
                  {colors.map(c => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, color: c.name }))}
                      className={`flex items-center gap-2 px-4 py-2 border font-body text-xs transition-all ${
                        form.color === c.name ? "border-gold text-gold" : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-gold/50"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-[hsl(var(--border))]"
                        style={{ background: c.value }}
                      />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size + Quantity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Размер *</label>
                  <select
                    required
                    className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                    value={form.size}
                    onChange={e => setForm(f => ({ ...f, size: e.target.value }))}
                  >
                    <option value="">Выбрать</option>
                    {["XS", "S", "M", "L", "XL", "XXL"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Количество</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                    value={form.quantity}
                    onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
                  />
                </div>
              </div>

              {/* Position */}
              <div>
                <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-3">Место вышивки</label>
                <div className="flex flex-col gap-2">
                  {embroideryPositions.map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, position: p }))}
                      className={`text-left px-4 py-3 border font-body text-xs tracking-[0.1em] transition-all flex items-center justify-between ${
                        form.position === p ? "border-gold text-gold" : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-gold/40"
                      }`}
                    >
                      {p}
                      {form.position === p && <Icon name="Check" size={12} className="text-gold" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-light">Ваш дизайн</h2>

              <div>
                <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Описание вышивки *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Опишите что хотите вышить: надпись, логотип, орнамент, цветы... Чем подробнее — тем точнее результат."
                  className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors resize-none placeholder:text-[hsl(var(--muted-foreground))]"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                />
              </div>

              <div>
                <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Ссылка на референс (необязательно)</label>
                <input
                  type="url"
                  placeholder="https://pinterest.com/..."
                  className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-[hsl(var(--muted-foreground))]"
                  value={form.referenceUrl}
                  onChange={e => setForm(f => ({ ...f, referenceUrl: e.target.value }))}
                />
              </div>

              <div className="border-t border-[hsl(var(--border))] pt-6">
                <h3 className="font-display text-xl font-light mb-4">Контакты</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { key: "name", label: "Имя", type: "text", placeholder: "Ваше имя", required: true },
                    { key: "phone", label: "Телефон / Telegram", type: "tel", placeholder: "+7 (999) 000-00-00", required: true },
                    { key: "email", label: "Email", type: "email", placeholder: "email@mail.ru", required: false },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">{f.label}{f.required ? " *" : ""}</label>
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
                </div>
              </div>

              <button
                type="submit"
                disabled={!form.garment || !form.size || !form.description || !form.name || !form.phone}
                className="uzor-btn-fill w-full disabled:opacity-40 disabled:cursor-not-allowed mt-2"
              >
                Отправить заявку
              </button>
              <p className="font-body text-[9px] text-[hsl(var(--muted-foreground))] text-center">
                После заявки мы свяжемся в течение 24 часов и согласуем стоимость
              </p>
            </div>
          </form>
        )}
      </div>

      <footer className="border-t border-[hsl(var(--border))] py-12 bg-[hsl(var(--card))] mt-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-display text-2xl tracking-[0.4em] text-gold">UZOR</span>
          <p className="font-body text-xs text-[hsl(var(--muted-foreground))] tracking-widest">© 2026 UZOR. Все права защищены.</p>
        </div>
      </footer>
    </main>
  );
}
