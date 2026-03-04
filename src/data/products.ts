export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  tags: string[];
  image: string;
  description: string;
  sizes: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  embroidery?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Футболка «Сад»",
    price: 2200,
    category: "Футболки",
    tags: ["футболка", "вышивка", "цветы", "белая", "унисекс"],
    image: "https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/6f239f47-3c47-4aaa-b2dd-fad06f6a9717.jpg",
    description: "Хлопок 100%, оверсайз-крой. Вышивка золотой нитью — цветочный орнамент на груди. Каждый стежок вручную.",
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    embroidery: "Золотые цветы",
  },
  {
    id: 2,
    name: "Худи «Узор»",
    price: 2700,
    category: "Кофты",
    tags: ["худи", "кофта", "вышивка", "чёрная", "унисекс", "оверсайз"],
    image: "https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/66656cb9-c86b-4a6a-8510-0d2604084503.jpg",
    description: "Тёплый хлопок с начёсом, оверсайз. Орнаментальная вышивка на груди — фирменный узор UZOR.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    isBestseller: true,
    embroidery: "Орнамент UZOR",
  },
  {
    id: 3,
    name: "Лонгслив «Герб»",
    price: 2400,
    category: "Лонгсливы",
    tags: ["лонгслив", "вышивка", "тёмно-синий", "герб", "унисекс"],
    image: "https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/38ec08a1-1302-494e-be5d-f8b485b64813.jpg",
    description: "Лонгслив из плотного хлопка с вышитым гербом. Золотая нить, плотная вышивка — деталь, которую замечают.",
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
    embroidery: "Золотой герб",
  },
  {
    id: 4,
    name: "Футболка «Минимал»",
    price: 1600,
    category: "Футболки",
    tags: ["футболка", "вышивка", "минимализм", "белая", "базовая"],
    image: "https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/6f239f47-3c47-4aaa-b2dd-fad06f6a9717.jpg",
    description: "Лаконичная футболка с небольшим вышитым логотипом UZOR. Идеальная база гардероба.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    embroidery: "Лого UZOR",
  },
  {
    id: 5,
    name: "Свитшот «Роза»",
    price: 2500,
    category: "Кофты",
    tags: ["свитшот", "кофта", "вышивка", "цветы", "роза", "серый"],
    image: "https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/66656cb9-c86b-4a6a-8510-0d2604084503.jpg",
    description: "Серый свитшот из органического хлопка. Объёмная вышивка розы на груди — роскошь в деталях.",
    sizes: ["S", "M", "L", "XL"],
    isBestseller: true,
    embroidery: "Роза",
  },
  {
    id: 6,
    name: "Лонгслив «Волна»",
    price: 2100,
    category: "Лонгсливы",
    tags: ["лонгслив", "вышивка", "абстракция", "унисекс", "чёрный"],
    image: "https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/38ec08a1-1302-494e-be5d-f8b485b64813.jpg",
    description: "Чёрный лонгслив с абстрактным орнаментом-волной. Вышивка проходит по всему левому рукаву.",
    sizes: ["S", "M", "L", "XL"],
    embroidery: "Волна (рукав)",
  },
  {
    id: 7,
    name: "Футболка «Звезда»",
    price: 1900,
    category: "Футболки",
    tags: ["футболка", "вышивка", "звезда", "бежевая", "оверсайз"],
    image: "https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/6f239f47-3c47-4aaa-b2dd-fad06f6a9717.jpg",
    description: "Бежевая оверсайз-футболка. Крупная звезда из бронзовой нити — акцент, который работает.",
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    embroidery: "Звезда бронза",
  },
  {
    id: 8,
    name: "Худи «Архив»",
    price: 2700,
    category: "Кофты",
    tags: ["худи", "кофта", "вышивка", "архив", "лимитед", "чёрная"],
    image: "https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/66656cb9-c86b-4a6a-8510-0d2604084503.jpg",
    description: "Лимитированная серия. Вышивка с архивным орнаментом UZOR 2026 — первая коллекция бренда.",
    sizes: ["S", "M", "L"],
    embroidery: "Архивный орнамент",
  },
  {
    id: 9,
    name: "Лонгслив «Манжет»",
    price: 800,
    category: "Лонгсливы",
    tags: ["лонгслив", "вышивка", "простой", "белый", "базовый"],
    image: "https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/38ec08a1-1302-494e-be5d-f8b485b64813.jpg",
    description: "Базовый лонгслив с лаконичной вышивкой-иероглифом на манжете. Деталь, которую не ждёшь.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    embroidery: "Иероглиф на манжете",
  },
];

export const categories = ["Все", "Футболки", "Лонгсливы", "Кофты"];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(price);
