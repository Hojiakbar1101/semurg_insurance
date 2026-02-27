"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Download, Plus } from "lucide-react";
import AppShell from "@/components/shared/AppShell";
import { CasesTable } from "@/components/cases/CasesTable";
import { MOCK_CASES } from "@/lib/api";
import { useI18n } from "@/i18n/context";
import type { ListFilters, RegressCase, } from "@/types";

export default function CasesPage() {
  const { t } = useI18n();
  const [filters, setFilters] = useState<ListFilters>({ page: 1, limit: 10 });

  // Client-side filtering of mock data (replace with real API call in production)
  const { filteredCases, total } = useMemo(() => {
    let data: RegressCase[] = [...MOCK_CASES];

    if (filters.status) data = data.filter((c) => c.status === filters.status);
    if (filters.direction) data = data.filter((c) => c.direction === filters.direction);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      data = data.filter(
        (c) =>
          c.debtor.full_name.toLowerCase().includes(q) ||
          c.debtor.passport.toLowerCase().includes(q) ||
          c.policy_number.toLowerCase().includes(q)
      );
    }
    if (filters.date_from) {
      data = data.filter((c) => c.incident_date >= filters.date_from!);
    }
    if (filters.date_to) {
      data = data.filter((c) => c.incident_date <= filters.date_to!);
    }

    if (filters.sort) {
      data.sort((a, b) => {
        const val = (c: RegressCase) => {
          if (filters.sort === "remaining_debt") return c.remaining_debt;
          if (filters.sort === "claim_amount") return c.claim_amount;
          if (filters.sort === "incident_date") return new Date(c.incident_date).getTime();
          return 0;
        };
        return filters.sort_dir === "asc" ? val(a) - val(b) : val(b) - val(a);
      });
    }

    const total = data.length;
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const paged = data.slice((page - 1) * limit, page * limit);
    return { filteredCases: paged, total };
  }, [filters]);

  return (
    <AppShell>
      <div className="p-4 lg:p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{t.cases}</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {t.showing} {total} {t.entries}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-gray-600 transition-colors">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">{t.export}</span>
            </button>
            <Link
              href="/cases/new"
              className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{t.addCase}</span>
            </Link>
          </div>
        </div>

        <CasesTable
          cases={filteredCases}
          total={total}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>
    </AppShell>
  );
}
