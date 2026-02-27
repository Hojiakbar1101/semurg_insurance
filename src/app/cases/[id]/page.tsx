"use client";

import { use } from "react";
import AppShell from "@/components/shared/AppShell";
import { CaseDetail } from "@/components/cases/CaseDetail";
import { MOCK_CASES } from "@/lib/api";
import { useI18n } from "@/i18n/context";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default function CaseDetailPage({ params }: Props) {
  const { id } = use(params);
  const { t } = useI18n();

  const caseData = MOCK_CASES.find((c) => c.id === parseInt(id));

  if (!caseData) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center h-80 gap-4">
          <div className="text-5xl">🔍</div>
          <div className="text-gray-500">{t.noData}</div>
          <Link
            href="/cases"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {t.back}
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <CaseDetail caseData={caseData} />
    </AppShell>
  );
}
