"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useI18n } from "@/i18n/context";
import { formatCurrency } from "@/lib/utils";
import type { MonthlyStats } from "@/types";

interface MonthlyChartProps {
  data: MonthlyStats;
}

function shortMonth(label: string): string {
  return label.slice(0, 3);
}

export function MonthlyChart({ data }: MonthlyChartProps) {
  const { t } = useI18n();

  const chartData = data.months.map((m) => ({
    month: shortMonth(m.label),
    cases: m.new_cases,
    amount: m.total_amount / 1_000_000,
  }));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">{t.monthlyDynamics}</h3>
        <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded">
          {data.year}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="cases"
            orientation="left"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="amount"
            orientation="right"
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}M`}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "12px",
            }}
            formatter={(value: number, name: string) => {
              if (name === "amount") return [`${formatCurrency(value * 1_000_000)} UZS`, t.totalClaim];
              return [value, t.totalCases];
            }}
          />
          <Bar
            yAxisId="cases"
            dataKey="cases"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
            maxBarSize={28}
          />
          <Bar
            yAxisId="amount"
            dataKey="amount"
            fill="#e0e7ff"
            radius={[4, 4, 0, 0]}
            maxBarSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 rounded-sm bg-blue-500" />
          <span className="text-xs text-gray-400">{t.totalCases}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 rounded-sm bg-indigo-100" />
          <span className="text-xs text-gray-400">{t.totalClaim} (M UZS)</span>
        </div>
      </div>
    </div>
  );
}
