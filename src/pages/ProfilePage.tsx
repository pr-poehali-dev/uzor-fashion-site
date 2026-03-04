import { useState } from "react";
import Icon from "@/components/ui/icon";
import { formatPrice } from "@/data/products";

const orders = [
  { id: "#UZ-2601", date: "28 февраля 2026", status: "Доставлен", items: ["Пальто «Нуар»", "Водолазка «Essentia»"], total: 114800 },
  { id: "#UZ-2589", date: "14 января 2026", status: "В пути", items: ["Платье «Soir»"], total: 67500 },
  { id: "#UZ-2547", date: "12 декабря 2025", status: "Доставлен", items: ["Кардиган «Calm»"], total: 38500 },
];

const statusColor: Record<string, string> = {
  "Доставлен": "text-gold",
  "В пути": "text-blue-400",
  "Обрабатывается": "text-[hsl(var(--muted-foreground))]",
};

export default function ProfilePage() {
  const [tab, setTab] = useState<"orders" | "settings">("orders");
  const [profile, setProfile] = useState({ name: "Анастасия", lastName: "Морозова", email: "a.morozova@email.ru", phone: "+7 (916) 123-45-67" });

  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end gap-6">
          <div>
            <span className="line-accent mb-4 block"></span>
            <h1 className="font-display text-6xl font-light">Профиль</h1>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <div className="w-14 h-14 border border-gold flex items-center justify-center">
              <Icon name="User" size={24} className="text-gold" />
            </div>
            <div>
              <p className="font-display text-xl font-light">{profile.name} {profile.lastName}</p>
              <p className="font-body text-xs text-[hsl(var(--muted-foreground))]">{profile.email}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[hsl(var(--border))] mb-10">
          {(["orders", "settings"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-body text-[10px] tracking-[0.2em] uppercase px-6 py-4 border-b-2 transition-all ${
                tab === t ? "border-gold text-gold" : "border-transparent text-[hsl(var(--muted-foreground))] hover:text-foreground"
              }`}
            >
              {t === "orders" ? "Мои заказы" : "Настройки"}
            </button>
          ))}
        </div>

        {tab === "orders" && (
          <div className="flex flex-col gap-4">
            {orders.map(order => (
              <div key={order.id} className="border border-[hsl(var(--border))] p-6 hover:border-gold/40 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="font-display text-lg font-light">{order.id}</p>
                      <p className="font-body text-xs text-[hsl(var(--muted-foreground))]">{order.date}</p>
                    </div>
                    <div className="hidden md:block h-10 w-px bg-[hsl(var(--border))]" />
                    <div>
                      <p className="font-body text-xs text-[hsl(var(--muted-foreground))] mb-1">Товары</p>
                      <p className="font-body text-sm">{order.items.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-body text-xs text-[hsl(var(--muted-foreground))] mb-1">Сумма</p>
                      <p className="font-body text-sm font-medium text-gold">{formatPrice(order.total)}</p>
                    </div>
                    <span className={`font-body text-[10px] tracking-[0.2em] uppercase ${statusColor[order.status] || ""}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "settings" && (
          <div className="max-w-xl flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Имя</label>
                <input
                  className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                  value={profile.name}
                  onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Фамилия</label>
                <input
                  className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                  value={profile.lastName}
                  onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                value={profile.email}
                onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Телефон</label>
              <input
                type="tel"
                className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                value={profile.phone}
                onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
              />
            </div>
            <button className="uzor-btn-fill w-full mt-4">
              Сохранить изменения
            </button>
          </div>
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
