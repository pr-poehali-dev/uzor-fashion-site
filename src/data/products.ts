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
}

export const products: Product[] = [
  {
    id: 1,
    name: "Пальто из кашемира «Нуар»",
    price: 89900,
    oldPrice: 112000,
    category: "Верхняя одежда",
    tags: ["пальто", "кашемир", "зима", "классика", "новинка"],
    image: "https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/a6c5fcce-df25-4d6f-8872-25ff62b46765.jpg",
    description: "Пальто из чистого кашемира с идеальным кроем. Воплощение роскоши и тепла.",
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: 2,
    name: "Водолазка «Essentia»",
    price: 24900,
    category: "Трикотаж",
    tags: ["водолазка", "шерсть", "базовый", "осень"],
    image: "https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/44305ad6-c086-443c-ad82-f67361bf61e6.jpg",
    description: "Мериносовая шерсть высшего сорта. Безупречная посадка на любую фигуру.",
    sizes: ["XS", "S", "M", "L"],
    isBestseller: true,
  },
  {
    id: 3,
    name: "Платье «Soir»",
    price: 67500,
    category: "Вечерние",
    tags: ["платье", "шёлк", "вечернее", "золото", "эксклюзив"],
    image: "https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/42dd822b-d121-4177-8b7c-140e1b5fab40.jpg",
    description: "Шёлковое платье с золотой вышивкой. Создано для особых моментов.",
    sizes: ["XS", "S", "M"],
    isNew: true,
  },
  {
    id: 4,
    name: "Жакет «Atelier»",
    price: 54900,
    category: "Пиджаки",
    tags: ["жакет", "шерсть", "офис", "классика"],
    image: "https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/a6c5fcce-df25-4d6f-8872-25ff62b46765.jpg",
    description: "Структурированный жакет из итальянской шерсти. Идеален для деловых встреч.",
    sizes: ["S", "M", "L", "XL"],
    isBestseller: true,
  },
  {
    id: 5,
    name: "Брюки «Minimal»",
    price: 32900,
    category: "Брюки",
    tags: ["брюки", "классика", "базовый", "офис"],
    image: "https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/44305ad6-c086-443c-ad82-f67361bf61e6.jpg",
    description: "Брюки безупречного кроя из облегчённой шерсти. Универсальность и стиль.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "Блуза «Lumière»",
    price: 29900,
    oldPrice: 38000,
    category: "Блузы",
    tags: ["блуза", "шёлк", "вечернее", "романтика"],
    image: "https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/42dd822b-d121-4177-8b7c-140e1b5fab40.jpg",
    description: "Блуза из лиоцелла с драпировкой. Лёгкость и женственность.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 7,
    name: "Юбка «Velours»",
    price: 41900,
    category: "Юбки",
    tags: ["юбка", "бархат", "вечернее", "осень"],
    image: "https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/a6c5fcce-df25-4d6f-8872-25ff62b46765.jpg",
    description: "Бархатная миди-юбка с боковым разрезом. Чувственная элегантность.",
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
  },
  {
    id: 8,
    name: "Кардиган «Calm»",
    price: 38500,
    category: "Трикотаж",
    tags: ["кардиган", "кашемир", "базовый", "осень"],
    image: "https://cdn.poehali.dev/projects/5ccb9080-1ed9-47c2-aa98-f006d1f107c4/files/44305ad6-c086-443c-ad82-f67361bf61e6.jpg",
    description: "Объёмный кардиган из кашемировой смеси. Уют и рафинированность.",
    sizes: ["S", "M", "L"],
    isBestseller: true,
  },
];

export const categories = ["Все", "Верхняя одежда", "Трикотаж", "Вечерние", "Пиджаки", "Брюки", "Блузы", "Юбки"];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(price);
