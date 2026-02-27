"use client";

import {
  TrendingUp,
  FileText,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useI18n } from "@/i18n/context";
import type { SummaryStats } from "@/types";

interface SummaryCardsProps {
  data: SummaryStats;
}

export function SummaryCards({ data }: SummaryCardsProps) {
  const { t } = useI18n();

  const cards = [
    {
      title: t.totalCases,
      value: data.total_cases.toLocaleString(),
      unit: "",
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      title: t.totalClaim,
      value: formatCurrency(data.total_claim_amount),
      unit: "UZS",
      icon: DollarSign,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
    {
      title: t.totalReturned,
      value: formatCurrency(data.total_returned),
      unit: "UZS",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      title: t.remainingDebt,
      value: formatCurrency(data.total_remaining_debt),
      unit: "UZS",
      icon: AlertCircle,
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-100",
    },
    {
      title: t.collectionRate,
      value: `${data.collection_rate_percent}%`,
      unit: "",
      icon: TrendingUp,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      title: t.postalExpense,
      value: formatCurrency(data.total_postal_expense),
      unit: "UZS",
      icon: BarChart3,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      border: "border-cyan-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`bg-white rounded-xl border ${card.border} p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 leading-tight">{card.title}</span>
            <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center shrink-0`}>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900 leading-none">{card.value}</div>
            {card.unit && <div className="text-xs text-gray-400 mt-0.5">{card.unit}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
