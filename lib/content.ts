import { IMAGE_VERSION } from "@/lib/image-version";

/** Файл лежит в `public/`. Чтобы обновить CV — замените PDF под тем же именем. */
export const CV_FILE = "Даниил Жучков Product Designer.pdf";
export const CV_URL = `/${encodeURIComponent(CV_FILE)}`;

/** Превью проектов лежат в `public/previews/<name>.png` */
const preview = (name: string) => `/previews/${name}.png?v=${IMAGE_VERSION}`;

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
      "Мобильное приложение с пошаговыми видеоуроками и тренировками для игроков и любителей футбола со всего мира",
    metric: "+23% Конверсия в подписку",
    metricLabel: "после редизайна онбординга",
    year: "2025",
    preview: preview("ball-in-goal"),
  },
  {
    id: "yourservice",
    title: "YourService",
    category: "B2B‑сервис · Web + Mobile",
    description:
      "B2B SaaS для компаний, оказывающих бытовые услуги – от ремонта электроприборов до сантехнических работ",
    metric: "Стратегический pivot",
    metricLabel: "на десктопе и мобайле",
    year: "2024",
    preview: preview("ys"),
  },
  {
    id: "cad-crm",
    title: "Окна Столицы",
    category: "B2B · Внутренний продукт",
    description:
      "Веб-приложение для проектирования и расчёта стоимости металлопластиковых конструкций для завода «Окна столицы»",
    metric: "−17% количество ошибок",
    metricLabel: "по данным внутренней аналитики",
    year: "2026",
    preview: preview("okna"),
  },
];

export const petProject = {
  id: "path-arrows",
  title: "Path Arrows",
  category: "Pet‑project · Figma Plugin",
  description:
    "С легкостью создавайте наглядные связи между объектами интерфейса с помощью стрелок. Этот плагин идеально подходит для демонстрации переходов между экранами, взаимодействия с кнопками и других взаимосвязей элементов UI.",
  metric: "8 000+ установок",
  href: "https://www.figma.com/community/plugin/1498555397611918564",
  preview: preview("path-arrows"),
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
