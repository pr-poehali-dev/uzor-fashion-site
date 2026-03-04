import { useState } from "react";
import Icon from "@/components/ui/icon";

const orgTypes = ["НКО / Благотворительный фонд", "Волонтёрское движение", "Спортивная команда", "Студенческая организация", "Культурное сообщество", "Другое"];

export default function SocialPage() {
  const [form, setForm] = useState({
    orgName: "",
    orgType: "",
    contactName: "",
    phone: "",
    email: "",
    socialLink: "",
    followers: "",
    request: "",
    quantity: "",
    garments: [] as string[],
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleGarment = (g: string) => {
    setForm(f => ({
      ...f,
      garments: f.garments.includes(g) ? f.garments.filter(x => x !== g) : [...f.garments, g],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://functions.poehali.dev/27c3f073-7ecc-469d-92f4-80ebf5bcd9a7", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Не удалось отправить. Попробуйте ещё раз или напишите напрямую.");
      }
    } catch {
      setError("Ошибка сети. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">

        {/* Header */}
        <div className="mb-16">
          <span className="line-accent mb-4 block"></span>
          <h1 className="font-display text-6xl lg:text-7xl font-light mb-6">
            Социальные<br />
            <em className="not-italic text-gold">запросы</em>
          </h1>
          <p className="font-body text-sm text-[hsl(var(--muted-foreground))] leading-relaxed max-w-xl">
            Мы верим, что одежда объединяет. Общественным организациям мы предоставляем мерч UZOR по себестоимости — в обмен на рассказ о нас в ваших социальных сетях.
          </p>
        </div>

        {/* Conditions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: "Heart",
              title: "Мы даём",
              items: ["Мерч по себестоимости", "Футболки, лонги, кофты", "Любые размеры", "Вышивка вашего логотипа"],
            },
            {
              icon: "Repeat2",
              title: "Вы делаете",
              items: ["Пост о UZOR в Instagram / VK / Telegram", "Отметка @uzor.brand", "Фото команды в мерче", "Честный рассказ о нас"],
            },
            {
              icon: "Users",
              title: "Для кого",
              items: ["НКО и фонды", "Волонтёрские движения", "Студенческие org", "Спортивные команды"],
            },
          ].map(block => (
            <div key={block.title} className="border border-[hsl(var(--border))] p-6 hover:border-gold/40 transition-colors">
              <Icon name={block.icon as "Heart"} size={20} className="text-gold mb-4" />
              <h3 className="font-display text-xl font-light mb-4">{block.title}</h3>
              <ul className="flex flex-col gap-2">
                {block.items.map(item => (
                  <li key={item} className="flex items-center gap-2 font-body text-sm text-[hsl(var(--muted-foreground))]">
                    <span className="text-gold">✦</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {sent ? (
          <div className="border border-gold p-12 text-center animate-fade-up max-w-lg mx-auto">
            <div className="w-16 h-16 border border-gold flex items-center justify-center mx-auto mb-6">
              <Icon name="Send" size={24} className="text-gold" />
            </div>
            <h2 className="font-display text-3xl font-light mb-3">Запрос отправлен!</h2>
            <p className="font-body text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              Мы получили вашу заявку и рассмотрим её в течение 2–3 рабочих дней. Ответим на указанный email или телефон.
            </p>
            <button className="uzor-btn mt-6" onClick={() => setSent(false)}>
              Отправить ещё заявку
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-light">Об организации</h2>

              <div>
                <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Название организации *</label>
                <input
                  required
                  className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                  placeholder="Фонд «Добрые дела»"
                  value={form.orgName}
                  onChange={e => setForm(f => ({ ...f, orgName: e.target.value }))}
                />
              </div>

              <div>
                <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-3">Тип организации *</label>
                <div className="flex flex-col gap-2">
                  {orgTypes.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, orgType: t }))}
                      className={`text-left px-4 py-3 border font-body text-xs tracking-[0.1em] transition-all flex items-center justify-between ${
                        form.orgType === t ? "border-gold text-gold" : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-gold/40"
                      }`}
                    >
                      {t}
                      {form.orgType === t && <Icon name="Check" size={12} className="text-gold" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Ссылка на соцсеть *</label>
                <input
                  required
                  type="url"
                  className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                  placeholder="https://vk.com/your_org"
                  value={form.socialLink}
                  onChange={e => setForm(f => ({ ...f, socialLink: e.target.value }))}
                />
              </div>

              <div>
                <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Примерная аудитория (подписчиков)</label>
                <input
                  className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                  placeholder="Например: 5 000"
                  value={form.followers}
                  onChange={e => setForm(f => ({ ...f, followers: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-light">Ваш запрос</h2>

              <div>
                <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-3">Что хотите заказать *</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Футболки", "Лонгсливы", "Худи", "Свитшоты"].map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => toggleGarment(g)}
                      className={`py-3 border font-body text-xs tracking-[0.1em] uppercase transition-all ${
                        form.garments.includes(g) ? "border-gold text-gold" : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-gold/40"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Примерное количество</label>
                <input
                  className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                  placeholder="Например: 20 штук"
                  value={form.quantity}
                  onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
                />
              </div>

              <div>
                <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">Расскажите о проекте / цели *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors resize-none placeholder:text-[hsl(var(--muted-foreground))]"
                  placeholder="Чем занимается ваша организация, для чего нужен мерч, как планируете о нас рассказать..."
                  value={form.request}
                  onChange={e => setForm(f => ({ ...f, request: e.target.value }))}
                />
              </div>

              <div className="border-t border-[hsl(var(--border))] pt-6 flex flex-col gap-3">
                <h3 className="font-display text-xl font-light">Контакты</h3>
                {[
                  { key: "contactName", label: "Контактное лицо *", type: "text", placeholder: "Иван Петров", required: true },
                  { key: "phone", label: "Телефон / Telegram *", type: "tel", placeholder: "+7 (999) 000-00-00", required: true },
                  { key: "email", label: "Email *", type: "email", placeholder: "org@mail.ru", required: true },
                ].map(f => (
                  <div key={f.key}>
                    <label className="font-body text-[9px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))] block mb-2">{f.label}</label>
                    <input
                      type={f.type}
                      required={f.required}
                      placeholder={f.placeholder}
                      className="w-full bg-[hsl(var(--card))] border border-[hsl(var(--border))] px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                      value={form[f.key as keyof typeof form] as string}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>

              {error && (
                <div className="border border-destructive px-4 py-3">
                  <p className="font-body text-xs text-destructive">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !form.orgName || !form.orgType || !form.socialLink || !form.request || !form.contactName || !form.email}
                className="uzor-btn-fill w-full disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Icon name="Loader2" size={14} className="animate-spin" />
                    Отправляем...
                  </>
                ) : (
                  <>
                    <Icon name="Send" size={14} />
                    Отправить запрос
                  </>
                )}
              </button>
              <p className="font-body text-[9px] text-[hsl(var(--muted-foreground))] text-center">
                Рассматриваем в течение 2–3 рабочих дней
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