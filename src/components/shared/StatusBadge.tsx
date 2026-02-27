"use client";

import { cn, STATUS_COLORS } from "@/lib/utils";
import { useI18n } from "@/i18n/context";
import type { RegressStatus } from "@/types";

interface StatusBadgeProps {
  status: RegressStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { t } = useI18n();
  const colors = STATUS_COLORS[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border",
        colors.bg,
        colors.text,
        colors.border,
        className
      )}
    >
      {t.status[status]}
    </span>
  );
}
