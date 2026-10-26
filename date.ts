import type { DailyLog } from "../types";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const BN_MONTHS = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];
const BN_WEEKDAYS = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র", "শনি"];

export function toBn(input: number | string): string {
  return String(input).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

export function todayStr(): string {
  return formatISO(new Date());
}

export function formatISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return formatISO(d);
}

export function diffInDays(a: string, b: string): number {
  const da = new Date(a + "T00:00:00").getTime();
  const db = new Date(b + "T00:00:00").getTime();
  return Math.round((db - da) / (1000 * 60 * 60 * 24));
}

export function formatBnDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const day = toBn(d.getDate());
  const month = BN_MONTHS[d.getMonth()];
  const year = toBn(d.getFullYear());
  const weekday = BN_WEEKDAYS[d.getDay()];
  return `${weekday}বার, ${day} ${month} ${year}`;
}

export function formatBnDateShort(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const day = toBn(d.getDate());
  const month = BN_MONTHS[d.getMonth()];
  const year = toBn(d.getFullYear());
  return `${day} ${month}, ${year}`;
}

export function suggestedDayNumber(startDate: string, dateStr: string): number {
  const diff = diffInDays(startDate, dateStr);
  return Math.max(1, diff + 1);
}

export function computeStreaks(logs: DailyLog[]): { current: number; longest: number } {
  const doneDates = Array.from(new Set(logs.filter((l) => l.done).map((l) => l.date))).sort();
  if (doneDates.length === 0) return { current: 0, longest: 0 };

  let longest = 1;
  let run = 1;
  for (let i = 1; i < doneDates.length; i++) {
    if (diffInDays(doneDates[i - 1], doneDates[i]) === 1) {
      run += 1;
    } else {
      run = 1;
    }
    longest = Math.max(longest, run);
  }

  // current streak: walk backward from today or yesterday
  const dateSet = new Set(doneDates);
  let cursor = todayStr();
  if (!dateSet.has(cursor)) {
    cursor = addDays(cursor, -1);
  }
  let current = 0;
  while (dateSet.has(cursor)) {
    current += 1;
    cursor = addDays(cursor, -1);
  }
  return { current, longest };
}

export { BN_DIGITS, BN_MONTHS, BN_WEEKDAYS };
