import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function ContactsPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="mb-16">
          <span className="line-accent mb-4 block"></span>
          <h1 className="font-display text-6xl font-light">Контакты</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="flex flex-col gap-10">
            <div>
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Атeлье & Шоурум</p>
              <div className="flex flex-col gap-6">
                {[
                  { icon: "MapPin", title: "Адрес", text: "Москва, ул. Петровка, 38\nГалерея «Цветной», 3 этаж" },
                  { icon: "Phone", title: "Телефон", text: "+7 (495) 999-00-11" },
                  { icon: "Mail", title: "Email", text: "hello@uzor.ru" },
                  { icon: "Clock", title: "Часы работы", text: "Пн–Сб: 11:00 — 21:00\nВс: 12:00 — 20:00" },
                ].map(item => (
                  <div key={item.icon} className="flex gap-4">
                    <div className="w-10 h-10 border border-gold flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon as "MapPin"} size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] mb-1">{item.title}</p>
                      <p className="font-body text-sm text-foreground whitespace-pre-line">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold mb-4">Социальные сети</p>
              <div className="flex gap-4">
                {["Instagram", "Telegram", "ВКонтакте"].map(s => (
                  <a
                    key={s}
                    href="#"
                    className="border border-[hsl(var(--border))] px-4 py-2 font-body text-[10px] tracking-[0.15em] uppercase text-[hsl(var(--muted-foreground))] hover:border-gold hover:text-gold transition-all duration-200"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            <div className="border border-[hsl(var(--border))] p-6 bg-[hsl(var(--card))]">
              <Icon name="MessageCircle" size={20} className="text-gold mb-3" />
              <h3 className="font-display text-xl font-light mb-2">Личный стилист</h3>
              <p className="font-body text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                Запишитесь на персональную консультацию в нашем шоуруме. Наш стилист поможет подобрать образ именно для вас.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold mb-6">Написать нам</p>

            {sent ? (
              <div className="border border-gold p-8 text-center animate-fade-up">
                <Icon name="CheckCircle" size={40} className="text-gold mx-auto mb-4" />
                <h3 className="font-display text-2xl font-light mb-2">Сообщение отправлено</h3>
                <p className="font-body text-sm text-[hsl(var(--muted-foreground))]">Мы свяжемся с вами в течение 24 часов</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Имя *</label>
                    <input
                      required
                      className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Телефон</label>
                    <input
                      type="tel"
                      className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Email *</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Сообщение *</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  />
                </div>
                <button type="submit" className="uzor-btn-fill w-full">
                  Отправить сообщение
                </button>
              </form>
            )}
          </div>
        </div>
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
