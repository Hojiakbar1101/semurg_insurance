"use client";

import { formatCurrency, DIRECTION_COLORS } from "@/lib/utils";
import { useI18n } from "@/i18n/context";
import type { DirectionStats } from "@/types";

interface DirectionTableProps {
  data: DirectionStats[];
}

export function DirectionTable({ data }: DirectionTableProps) {
  const { t } = useI18n();

  const totals = data.reduce(
    (acc, row) => ({
      cases: acc.cases + row.total_cases,
      claim: acc.claim + row.total_claim_amount,
      returned: acc.returned + row.total_returned,
      debt: acc.debt + row.remaining_debt,
      pre_count: acc.pre_count + row.status.pre_court.count,
      pre_amount: acc.pre_amount + row.status.pre_court.amount,
      court_count: acc.court_count + row.status.court.count,
      court_amount: acc.court_amount + row.status.court.amount,
      enf_count: acc.enf_count + row.status.enforcement.count,
      enf_amount: acc.enf_amount + row.status.enforcement.amount,
    }),
    { cases: 0, claim: 0, returned: 0, debt: 0, pre_count: 0, pre_amount: 0, court_count: 0, court_amount: 0, enf_count: 0, enf_amount: 0 }
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700">{t.byDirection}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-4 py-3 font-semibold text-gray-500 whitespace-nowrap">{t.direction}</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-500 whitespace-nowrap">{t.totalCases}</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-500 whitespace-nowrap">{t.totalClaim}</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-500 whitespace-nowrap">{t.totalReturned}</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-500 whitespace-nowrap">{t.remainingDebt}</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-500 whitespace-nowrap border-l border-gray-100" colSpan={2}>{t.preCourt}</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-500 whitespace-nowrap border-l border-gray-100" colSpan={2}>{t.court}</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-500 whitespace-nowrap border-l border-gray-100" colSpan={2}>{t.enforcement}</th>
            </tr>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-4 py-1.5" />
              <th className="px-3 py-1.5" />
              <th className="px-3 py-1.5 text-right text-gray-400 font-normal">UZS</th>
              <th className="px-3 py-1.5 text-right text-gray-400 font-normal">UZS</th>
              <th className="px-3 py-1.5 text-right text-gray-400 font-normal">UZS</th>
              <th className="px-3 py-1.5 text-right text-gray-400 font-normal border-l border-gray-100">N</th>
              <th className="px-3 py-1.5 text-right text-gray-400 font-normal">UZS</th>
              <th className="px-3 py-1.5 text-right text-gray-400 font-normal border-l border-gray-100">N</th>
              <th className="px-3 py-1.5 text-right text-gray-400 font-normal">UZS</th>
              <th className="px-3 py-1.5 text-right text-gray-400 font-normal border-l border-gray-100">N</th>
              <th className="px-3 py-1.5 text-right text-gray-400 font-normal">UZS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((row) => (
              <tr key={row.direction} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: DIRECTION_COLORS[row.direction] || "#6b7280" }}
                    />
                    <span className="font-medium text-gray-800">{row.direction}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-right font-semibold text-gray-800">{row.total_cases}</td>
                <td className="px-3 py-3 text-right text-gray-600">{formatCurrency(row.total_claim_amount)}</td>
                <td className="px-3 py-3 text-right text-emerald-600 font-medium">{formatCurrency(row.total_returned)}</td>
                <td className="px-3 py-3 text-right text-red-500 font-medium">{formatCurrency(row.remaining_debt)}</td>
                <td className="px-3 py-3 text-right text-gray-600 border-l border-gray-100">{row.status.pre_court.count}</td>
                <td className="px-3 py-3 text-right text-gray-600">{formatCurrency(row.status.pre_court.amount)}</td>
                <td className="px-3 py-3 text-right text-gray-600 border-l border-gray-100">{row.status.court.count}</td>
                <td className="px-3 py-3 text-right text-gray-600">{formatCurrency(row.status.court.amount)}</td>
                <td className="px-3 py-3 text-right text-gray-600 border-l border-gray-100">{row.status.enforcement.count}</td>
                <td className="px-3 py-3 text-right text-gray-600">{formatCurrency(row.status.enforcement.amount)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-blue-50 font-semibold text-gray-900 border-t-2 border-blue-200">
              <td className="px-4 py-3 font-bold text-blue-800">Jami / Итого / Total</td>
              <td className="px-3 py-3 text-right">{totals.cases}</td>
              <td className="px-3 py-3 text-right">{formatCurrency(totals.claim)}</td>
              <td className="px-3 py-3 text-right text-emerald-700">{formatCurrency(totals.returned)}</td>
              <td className="px-3 py-3 text-right text-red-600">{formatCurrency(totals.debt)}</td>
              <td className="px-3 py-3 text-right border-l border-blue-200">{totals.pre_count}</td>
              <td className="px-3 py-3 text-right">{formatCurrency(totals.pre_amount)}</td>
              <td className="px-3 py-3 text-right border-l border-blue-200">{totals.court_count}</td>
              <td className="px-3 py-3 text-right">{formatCurrency(totals.court_amount)}</td>
              <td className="px-3 py-3 text-right border-l border-blue-200">{totals.enf_count}</td>
              <td className="px-3 py-3 text-right">{formatCurrency(totals.enf_amount)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
