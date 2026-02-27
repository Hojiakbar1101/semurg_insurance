"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Eye,
} from "lucide-react";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useI18n } from "@/i18n/context";
import type { RegressCase, RegressStatus, Direction, ListFilters } from "@/types";

const STATUSES: RegressStatus[] = [
  "NOT_REVIEWED",
  "SENT_TO_LAWYER",
  "IN_COLLECTION",
  "FULLY_COLLECTED",
  "ARCHIVED",
];

const DIRECTIONS: Direction[] = [
  "Ucell", "ЙТҲ", "Асака", "Давр", "Агат", "Микромолия 2", "Микромолия 3",
];

interface CasesTableProps {
  cases: RegressCase[];
  total: number;
  filters: ListFilters;
  onFiltersChange: (filters: ListFilters) => void;
  loading?: boolean;
}

export function CasesTable({
  cases,
  total,
  filters,
  onFiltersChange,
  loading,
}: CasesTableProps) {
  const { t } = useI18n();
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState<ListFilters>(filters);

  const page = filters.page || 1;
  const limit = filters.limit || 20;
  const totalPages = Math.ceil(total / limit);

  const applyFilters = () => {
    onFiltersChange({ ...localFilters, page: 1 });
    setShowFilters(false);
  };

  const resetFilters = () => {
    const reset: ListFilters = { page: 1, limit };
    setLocalFilters(reset);
    onFiltersChange(reset);
  };

  const hasActiveFilters =
    filters.status || filters.direction || filters.search || filters.date_from || filters.date_to;

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={localFilters.search || ""}
            onChange={(e) =>
              setLocalFilters((f) => ({ ...f, search: e.target.value }))
            }
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters((v) => !v)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors",
            hasActiveFilters
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
          )}
        >
          <Filter className="w-4 h-4" />
          {t.filters}
          {hasActiveFilters && (
            <span className="bg-white/30 text-white text-xs px-1.5 rounded-full">
              •
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            {t.resetFilters}
          </button>
        )}

        <div className="ml-auto text-xs text-gray-400">
          {t.showing} {Math.min((page - 1) * limit + 1, total)}–{Math.min(page * limit, total)} {t.of} {total} {t.entries}
        </div>
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Status */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
            <select
              value={localFilters.status || ""}
              onChange={(e) =>
                setLocalFilters((f) => ({ ...f, status: (e.target.value as RegressStatus) || undefined }))
              }
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">—</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{t.status[s]}</option>
              ))}
            </select>
          </div>

          {/* Direction */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.direction}</label>
            <select
              value={localFilters.direction || ""}
              onChange={(e) =>
                setLocalFilters((f) => ({ ...f, direction: (e.target.value as Direction) || undefined }))
              }
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">{t.allDirections}</option>
              {DIRECTIONS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Date from */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.dateFrom}</label>
            <input
              type="date"
              value={localFilters.date_from || ""}
              onChange={(e) =>
                setLocalFilters((f) => ({ ...f, date_from: e.target.value || undefined }))
              }
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* Date to */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{t.dateTo}</label>
            <input
              type="date"
              value={localFilters.date_to || ""}
              onChange={(e) =>
                setLocalFilters((f) => ({ ...f, date_to: e.target.value || undefined }))
              }
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* Sort */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Sort</label>
            <select
              value={`${localFilters.sort || ""}:${localFilters.sort_dir || ""}`}
              onChange={(e) => {
                const [sort, sort_dir] = e.target.value.split(":");
                setLocalFilters((f) => ({
                  ...f,
                  sort: (sort as ListFilters["sort"]) || undefined,
                  sort_dir: (sort_dir as ListFilters["sort_dir"]) || undefined,
                }));
              }}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value=":">—</option>
              <option value="remaining_debt:desc">{t.remainingDebtCol} ↓</option>
              <option value="remaining_debt:asc">{t.remainingDebtCol} ↑</option>
              <option value="claim_amount:desc">{t.claimAmount} ↓</option>
              <option value="incident_date:desc">{t.incidentDate} ↓</option>
              <option value="incident_date:asc">{t.incidentDate} ↑</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="col-span-full flex justify-end gap-2 mt-1">
            <button
              onClick={() => setShowFilters(false)}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              {t.cancel}
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {t.applyFilters}
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 font-semibold text-gray-500 w-12">{t.id}</th>
                <th className="text-left px-3 py-3 font-semibold text-gray-500">Status</th>
                <th className="text-left px-3 py-3 font-semibold text-gray-500">{t.insured}</th>
                <th className="text-left px-3 py-3 font-semibold text-gray-500">{t.direction}</th>
                <th className="text-left px-3 py-3 font-semibold text-gray-500">{t.policyNumber}</th>
                <th className="text-left px-3 py-3 font-semibold text-gray-500">{t.debtor}</th>
                <th className="text-right px-3 py-3 font-semibold text-gray-500 whitespace-nowrap">
                  <button
                    onClick={() => onFiltersChange({ ...filters, sort: "incident_date", sort_dir: filters.sort_dir === "asc" ? "desc" : "asc" })}
                    className="inline-flex items-center gap-1 hover:text-blue-600"
                  >
                    {t.incidentDate}
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-right px-3 py-3 font-semibold text-gray-500 whitespace-nowrap">
                  <button
                    onClick={() => onFiltersChange({ ...filters, sort: "claim_amount", sort_dir: filters.sort_dir === "asc" ? "desc" : "asc" })}
                    className="inline-flex items-center gap-1 hover:text-blue-600"
                  >
                    {t.claimAmount}
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-right px-3 py-3 font-semibold text-gray-500 whitespace-nowrap">
                  <button
                    onClick={() => onFiltersChange({ ...filters, sort: "remaining_debt", sort_dir: filters.sort_dir === "asc" ? "desc" : "asc" })}
                    className="inline-flex items-center gap-1 hover:text-blue-600"
                  >
                    {t.remainingDebtCol}
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-3 py-3 w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={10} className="text-center py-16 text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                      <span>{t.loading}</span>
                    </div>
                  </td>
                </tr>
              ) : cases.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-16 text-gray-400">
                    {t.noData}
                  </td>
                </tr>
              ) : (
                cases.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-gray-400 font-medium">#{c.id}</td>
                    <td className="px-3 py-3">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-3 py-3 text-gray-700 font-medium max-w-32 truncate">{c.insured}</td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1.5 text-gray-600">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: "#3b82f6" }}
                        />
                        {c.direction}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-gray-500 font-mono">{c.policy_number}</td>
                    <td className="px-3 py-3 text-gray-700 max-w-36">
                      <div className="truncate font-medium">{c.debtor.full_name}</div>
                      <div className="text-gray-400 truncate">{c.debtor.passport}</div>
                    </td>
                    <td className="px-3 py-3 text-right text-gray-500">{formatDate(c.incident_date)}</td>
                    <td className="px-3 py-3 text-right font-medium text-gray-800">
                      {formatCurrency(c.claim_amount)}
                    </td>
                    <td className={cn(
                      "px-3 py-3 text-right font-semibold",
                      c.remaining_debt === 0 ? "text-emerald-600" : "text-red-500"
                    )}>
                      {formatCurrency(c.remaining_debt)}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <Link
                        href={`/cases/${c.id}`}
                        className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <div className="text-xs text-gray-400">
              {t.page} {page} {t.of} {totalPages}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onFiltersChange({ ...filters, page: page - 1 })}
                disabled={page <= 1}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let p: number;
                if (totalPages <= 5) p = i + 1;
                else if (page <= 3) p = i + 1;
                else if (page >= totalPages - 2) p = totalPages - 4 + i;
                else p = page - 2 + i;
                return (
                  <button
                    key={p}
                    onClick={() => onFiltersChange({ ...filters, page: p })}
                    className={cn(
                      "w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium transition-colors",
                      p === page
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100 text-gray-600"
                    )}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                onClick={() => onFiltersChange({ ...filters, page: page + 1 })}
                disabled={page >= totalPages}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
