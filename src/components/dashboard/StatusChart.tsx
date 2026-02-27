"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useI18n } from "@/i18n/context";
import type { SummaryStats, RegressStatus } from "@/types";

const STATUS_PIE_COLORS: Record<RegressStatus, string> = {
  NOT_REVIEWED: "#94a3b8",
  SENT_TO_LAWYER: "#f59e0b",
  IN_COLLECTION: "#3b82f6",
  FULLY_COLLECTED: "#10b981",
  ARCHIVED: "#6b7280",
};

interface StatusChartProps {
  data: SummaryStats;
}

export function StatusChart({ data }: StatusChartProps) {
  const { t } = useI18n();

  const chartData = (Object.keys(data.by_status) as RegressStatus[])
    .filter((s) => data.by_status[s] > 0)
    .map((s) => ({
      name: t.status[s],
      value: data.by_status[s],
      status: s,
    }));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">{t.byStatus}</h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry) => (
              <Cell
                key={entry.status}
                fill={STATUS_PIE_COLORS[entry.status]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [value, ""]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "12px",
            }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span style={{ fontSize: "11px", color: "#6b7280" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
