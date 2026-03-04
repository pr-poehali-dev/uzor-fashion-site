export default function AboutPage() {
  return (
    <main className="pt-16 min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/15c34760-6b11-477a-942a-a3f870c6e9f8.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background))]/50 to-transparent" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 w-full">
          <span className="line-accent mb-4 block"></span>
          <h1 className="font-display text-7xl font-light">О бренде</h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-up">
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold mb-6">История</p>
            <h2 className="font-display text-5xl font-light leading-tight mb-8">
              Рождённый из<br />
              <em className="not-italic text-gold">страсти к деталям</em>
            </h2>
            <div className="flex flex-col gap-4 font-body text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              <p>UZOR основан в 2026 году с одной идеей — вышивка как язык идентичности. Мы создаём футболки, лонгсливы и кофты, в которых каждый стежок — это авторское высказывание, а не просто принт.</p>
              <p>Мы не гонимся за масштабом. Каждая вещь производится небольшой партией, с ручной вышивкой и строгим контролем качества ткани и исполнения.</p>
              <p>UZOR — это бренд для тех, кто ценит детали. Кто замечает разницу между нанесённым логотипом и настоящей вышивкой.</p>
            </div>
          </div>
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/42dd822b-d121-4177-8b7c-140e1b5fab40.jpg"
              alt="UZOR Brand"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[hsl(var(--card))] border-y border-[hsl(var(--border))]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16 text-center">
            <span className="line-accent mx-auto block mb-4"></span>
            <h2 className="font-display text-5xl font-light">Наши ценности</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: "01", title: "Мастерство", text: "Каждая вещь проходит 47 этапов контроля качества. Мы не выпускаем ничего, что не совершенно." },
              { num: "02", title: "Устойчивость", text: "Ткани от сертифицированных производителей. Ограниченные тиражи. Без перепроизводства." },
              { num: "03", title: "Наследие", text: "Русские орнаментальные мотивы, переосмысленные через призму современного минимализма." },
            ].map(v => (
              <div key={v.num} className="flex flex-col gap-4">
                <span className="font-display text-6xl font-light text-gold opacity-30">{v.num}</span>
                <h3 className="font-display text-2xl font-light">{v.title}</h3>
                <p className="font-body text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-24 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { num: "2026", label: "Год основания" },
            { num: "100%", label: "Ручная вышивка" },
            { num: "1300+", label: "Довольных клиентов" },
            { num: "3", label: "Вида изделий" },
          ].map(item => (
            <div key={item.num} className="flex flex-col gap-2">
              <span className="font-display text-6xl font-light text-gold">{item.num}</span>
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-[hsl(var(--muted-foreground))]">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--border))] py-12 bg-[hsl(var(--card))]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-display text-2xl tracking-[0.4em] text-gold">UZOR</span>
          <p className="font-body text-xs text-[hsl(var(--muted-foreground))] tracking-widest">© 2026 UZOR. Все права защищены.</p>
        </div>
      </footer>
    </main>
  );
}