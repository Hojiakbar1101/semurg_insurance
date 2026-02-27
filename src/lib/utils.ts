import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { RegressStatus } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "—";
  return new Intl.NumberFormat("uz-UZ", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | null | undefined): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export const STATUS_COLORS: Record<RegressStatus, { bg: string; text: string; border: string }> = {
  NOT_REVIEWED: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-300" },
  SENT_TO_LAWYER: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-300" },
  IN_COLLECTION: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-300" },
  FULLY_COLLECTED: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-300" },
  ARCHIVED: { bg: "bg-gray-100", text: "text-gray-500", border: "border-gray-300" },
};

export const DIRECTION_COLORS: Record<string, string> = {
  "Асака": "#2563eb",
  "Давр": "#7c3aed",
  "Агат": "#0891b2",
  "ЙТҲ": "#059669",
  "Ucell": "#d97706",
  "Микромолия 2": "#db2777",
  "Микромолия 3": "#dc2626",
};

export function truncate(str: string, len = 30): string {
  if (str.length <= len) return str;
  return str.slice(0, len) + "…";
}
