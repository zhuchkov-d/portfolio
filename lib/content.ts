export const CV_URL = "/cv.pdf";

export const sections = [
  { id: "hero", label: "Обо мне" },
  { id: "work", label: "Проекты" },
  { id: "pet", label: "Pet‑project" },
  { id: "contacts", label: "Контакты" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  metric: string;
  metricLabel: string;
  year: string;
  preview?: string;
};

export const projects: Project[] = [
  {
    id: "ball-in-goal",
    title: "Ball in Goal",
    category: "Mobile · SportTech",
    description:
      "Приложение для любительского футбола: запись на игры, составы и статистика. Переработал онбординг и флоу записи — от первого экрана до подтверждённого места за три шага.",
    metric: "+23% Конверсия в подписку",
    metricLabel: "после редизайна онбординга",
    year: "2025",
  },
  {
    id: "yourservice",
    title: "YourService",
    category: "B2B‑сервис · Web + Mobile",
    description:
      "Маркетплейс бытовых услуг. Спроектировал поиск, карточку исполнителя и заказ в одном сценарии, собрал дизайн‑систему на 60+ компонентов.",
    metric: "Стратегический pivot",
    metricLabel: "на десктопе и мобайле",
    year: "2024",
  },
  {
    id: "cad-crm",
    title: "Окна Столицы",
    category: "B2B · Внутренний продукт",
    description:
      "Связка проектирования и продаж для производственной компании. Упростил рабочее место менеджера: меньше переключений между окнами, больше контекста на одном экране.",
    metric: "−17% количество ошибок",
    metricLabel: "по данным внутренней аналитики",
    year: "2026",
  },
];

export const petProject = {
  id: "path-arrows",
  title: "Path Arrows",
  category: "Pet‑project · Figma Plugin",
  description:
    "Плагин, который рисует аккуратные стрелки вдоль любого path и держит их «живыми» при редактировании. Сделал от идеи до публикации в Figma Community: спецификация, UI, код.",
  metric: "8 000+ установок",
  href: "https://www.figma.com/community/plugin/1498555397611918564",
};

export const contacts = [
  {
    id: "telegram",
    label: "Telegram",
    value: "@daniel_zhuchkov",
    href: "https://t.me/daniel_zhuchkov",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "in/daniel-zhuchkov",
    href: "https://www.linkedin.com/in/danielzhuchkov/",
  },
  {
    id: "email",
    label: "Почта",
    value: "zhuchkov.00@gmail.com",
    href: "mailto:hello@zhuchkov.design",
  },
] as const;
