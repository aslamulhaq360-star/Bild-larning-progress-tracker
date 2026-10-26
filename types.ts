export interface SyllabusItem {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  createdAt: number;
}

export interface DailyLog {
  id: string;
  date: string; // YYYY-MM-DD
  dayNumber: number;
  learned: string; // আজকে কি শিখেছি
  planNext: string; // আগামীকাল কি শিখবো
  done: boolean; // সম্পন্ন টিক মার্ক
  createdAt: number;
}

export interface Profile {
  id: string;
  name: string;
  emoji: string;
  color: ThemeKey;
  goal: string;
  targetDays: number | null; // লক্ষ্য দিন সংখ্যা (ঐচ্ছিক)
  startDate: string; // YYYY-MM-DD
  syllabus: SyllabusItem[];
  logs: DailyLog[];
  createdAt: number;
}

export type ThemeKey =
  | "indigo"
  | "emerald"
  | "rose"
  | "amber"
  | "sky"
  | "fuchsia"
  | "teal"
  | "orange";

export const THEME_MAP: Record<
  ThemeKey,
  { grad: string; solid: string; text: string; ring: string; soft: string }
> = {
  indigo: {
    grad: "from-indigo-500 to-violet-600",
    solid: "bg-indigo-600",
    text: "text-indigo-600",
    ring: "ring-indigo-400",
    soft: "bg-indigo-50",
  },
  emerald: {
    grad: "from-emerald-500 to-teal-600",
    solid: "bg-emerald-600",
    text: "text-emerald-600",
    ring: "ring-emerald-400",
    soft: "bg-emerald-50",
  },
  rose: {
    grad: "from-rose-500 to-pink-600",
    solid: "bg-rose-600",
    text: "text-rose-600",
    ring: "ring-rose-400",
    soft: "bg-rose-50",
  },
  amber: {
    grad: "from-amber-500 to-orange-600",
    solid: "bg-amber-600",
    text: "text-amber-600",
    ring: "ring-amber-400",
    soft: "bg-amber-50",
  },
  sky: {
    grad: "from-sky-500 to-blue-600",
    solid: "bg-sky-600",
    text: "text-sky-600",
    ring: "ring-sky-400",
    soft: "bg-sky-50",
  },
  fuchsia: {
    grad: "from-fuchsia-500 to-purple-600",
    solid: "bg-fuchsia-600",
    text: "text-fuchsia-600",
    ring: "ring-fuchsia-400",
    soft: "bg-fuchsia-50",
  },
  teal: {
    grad: "from-teal-500 to-cyan-600",
    solid: "bg-teal-600",
    text: "text-teal-600",
    ring: "ring-teal-400",
    soft: "bg-teal-50",
  },
  orange: {
    grad: "from-orange-500 to-red-600",
    solid: "bg-orange-600",
    text: "text-orange-600",
    ring: "ring-orange-400",
    soft: "bg-orange-50",
  },
};

export const EMOJI_OPTIONS = [
  "💻", "🤖", "🇬🇧", "📚", "🎨", "🎵", "🧮", "🔬", "📷", "✍️", "🗣️", "🏋️", "🍳", "🎮", "🌐", "📈",
];
