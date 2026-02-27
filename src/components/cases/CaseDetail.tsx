"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Gavel,
  Shield,
  User,
  MapPin,
  Phone,
  CreditCard,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useI18n } from "@/i18n/context";
import type { RegressCase } from "@/types";

interface CaseDetailProps {
  caseData: RegressCase;
}

interface FieldProps {
  label: string;
  value: string | number | null | undefined;
  mono?: boolean;
  highlight?: "green" | "red";
}

function Field({ label, value, mono, highlight }: FieldProps) {
  return (
    <div>
      <div className="text-xs text-gray-400 mb-0.5">{label}</div>
      <div
        className={cn(
          "text-sm font-medium",
          mono && "font-mono",
          highlight === "green" && "text-emerald-600",
          highlight === "red" && "text-red-500",
          !highlight && "text-gray-900"
        )}
      >
        {value ?? "—"}
      </div>
    </div>
  );
}

interface SectionProps {
  icon: React.ElementType;
  title: string;
  color: string;
  children: React.ReactNode;
}

function Section({ icon: Icon, title, color, children }: SectionProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className={`flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 ${color}`}>
        <Icon className="w-4 h-4" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
}

interface ProcessStepProps {
  icon: React.ElementType;
  title: string;
  date: string | null;
  number?: string | number | null;
  amount?: number | null;
  extra?: React.ReactNode;
  active: boolean;
  done: boolean;
}

function ProcessStep({ icon: Icon, title, date, number, amount, extra, active, done }: ProcessStepProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border p-4 transition-all",
        done && "bg-emerald-50 border-emerald-200",
        active && !done && "bg-amber-50 border-amber-200",
        !active && !done && "bg-gray-50 border-gray-200 opacity-60"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
            done && "bg-emerald-100 text-emerald-600",
            active && !done && "bg-amber-100 text-amber-600",
            !active && !done && "bg-gray-200 text-gray-400"
          )}
        >
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-gray-800">{title}</span>
            {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
            {active && !done && <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
          </div>
          {date ? (
            <div className="text-xs text-gray-500 space-y-0.5">
              {number !== undefined && number !== null && (
                <div>№ <span className="font-mono font-medium text-gray-700">{number}</span></div>
              )}
              <div>{formatDate(date)}</div>
              {amount !== undefined && amount !== null && (
                <div className="font-semibold text-gray-800">{formatCurrency(amount)} UZS</div>
              )}
              {extra}
            </div>
          ) : (
            <div className="text-xs text-gray-400 italic">—</div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CaseDetail({ caseData: c }: CaseDetailProps) {
  const { t } = useI18n();

  const hasWarning = !!c.process.warning_letter_date;
  const hasLawsuit = !!c.process.lawsuit_date;
  const hasCourt = !!c.process.court_date;
  const hasEnforcement = !!c.process.enforcement_date;

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/cases"
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-500 shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-gray-900">{t.caseDetail} #{c.id}</h1>
              <StatusBadge status={c.status} />
            </div>
            <div className="text-sm text-gray-400 mt-0.5">{c.insured} · {c.direction}</div>
          </div>
        </div>

        {/* Financial summary */}
        <div className="flex gap-3">
          <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm text-center">
            <div className="text-xs text-gray-400 mb-0.5">{t.claimAmount}</div>
            <div className="text-base font-bold text-gray-900">{formatCurrency(c.claim_amount)}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm text-center">
            <div className="text-xs text-gray-400 mb-0.5">{t.totalReturned}</div>
            <div className="text-base font-bold text-emerald-600">{formatCurrency(c.returned_amount)}</div>
          </div>
          <div className={cn(
            "rounded-xl border px-4 py-3 shadow-sm text-center",
            c.remaining_debt === 0 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
          )}>
            <div className="text-xs text-gray-400 mb-0.5">{t.remainingDebt}</div>
            <div className={cn(
              "text-base font-bold",
              c.remaining_debt === 0 ? "text-emerald-600" : "text-red-500"
            )}>
              {formatCurrency(c.remaining_debt)}
            </div>
          </div>
        </div>
      </div>

      {/* Contract */}
      <Section icon={Shield} title={t.contractInfo} color="bg-blue-50 text-blue-700">
        <Field label={t.contractNumber} value={c.contract_number} mono />
        <Field label={t.contractDate} value={formatDate(c.contract_date)} />
        <Field label={t.policyNumber} value={c.policy_number} mono />
        <Field label={t.insuranceLiability} value={c.insurance_liability ? `${formatCurrency(c.insurance_liability)} UZS` : null} />
        <Field label={t.insurancePremium} value={c.insurance_premium ? `${formatCurrency(c.insurance_premium)} UZS` : null} />
        <Field label={t.coverageStart} value={formatDate(c.coverage_start)} />
        <Field label={t.coverageEnd} value={formatDate(c.coverage_end)} />
        <Field label={t.insuranceClass} value={c.insurance_class} />
      </Section>

      {/* Payment basis */}
      <Section icon={CreditCard} title={t.paymentInfo} color="bg-purple-50 text-purple-700">
        <Field label={t.incidentDate} value={formatDate(c.incident_date)} />
        <Field label={t.protocolNumber} value={c.protocol_number} mono />
        <Field label={t.protocolDate} value={formatDate(c.protocol_date)} />
        <Field label={t.paymentDate} value={formatDate(c.payment_date)} />
        <Field label={t.claimAmount} value={`${formatCurrency(c.claim_amount)} UZS`} highlight="red" />
        <Field label={t.postalExpense} value={c.postal_expense > 0 ? `${formatCurrency(c.postal_expense)} UZS` : null} />
        <Field label={t.penalty} value={c.penalty > 0 ? `${formatCurrency(c.penalty)} UZS` : null} />
        <Field label={t.totalReturned} value={`${formatCurrency(c.returned_amount)} UZS`} highlight="green" />
      </Section>

      {/* Debtor */}
      <Section icon={User} title={t.debtorInfo} color="bg-orange-50 text-orange-700">
        <Field label={t.fullName} value={c.debtor.full_name} />
        <Field label={t.pinfl} value={c.debtor.pinfl} mono />
        <Field label={t.passport} value={c.debtor.passport} mono />
        <Field label={t.region} value={c.debtor.region} />
        <div className="col-span-2 sm:col-span-3 lg:col-span-2">
          <div className="text-xs text-gray-400 mb-0.5">{t.address}</div>
          <div className="text-sm font-medium text-gray-900">{c.debtor.address}</div>
        </div>
        <Field label={t.phone} value={c.debtor.phone} mono />
      </Section>

      {/* Process timeline */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 bg-gray-50 text-gray-700">
          <Calendar className="w-4 h-4" />
          <h3 className="text-sm font-semibold">{t.processInfo}</h3>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ProcessStep
            icon={FileText}
            title={t.warningLetter}
            date={c.process.warning_letter_date}
            number={c.process.warning_letter_number}
            amount={c.process.warning_amount}
            active={true}
            done={hasWarning}
          />
          <ProcessStep
            icon={AlertTriangle}
            title={t.lawsuit}
            date={c.process.lawsuit_date}
            number={c.process.lawsuit_number}
            extra={c.process.lawsuit_status ? (
              <div className="mt-1 text-xs px-1.5 py-0.5 rounded bg-white border border-gray-200 inline-block">
                {c.process.lawsuit_status}
              </div>
            ) : null}
            active={hasWarning}
            done={hasLawsuit}
          />
          <ProcessStep
            icon={Gavel}
            title={t.courtDecision}
            date={c.process.court_date}
            number={c.process.court_case_number}
            amount={c.process.court_amount}
            active={hasLawsuit}
            done={hasCourt}
          />
          <ProcessStep
            icon={Shield}
            title={t.enforcementOrder}
            date={c.process.enforcement_date}
            number={c.process.enforcement_number}
            amount={c.process.enforcement_amount}
            extra={
              c.process.enforcement_officer ? (
                <div className="mt-1 space-y-0.5">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {c.process.enforcement_officer}
                  </div>
                  {c.process.enforcement_phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {c.process.enforcement_phone}
                    </div>
                  )}
                </div>
              ) : null
            }
            active={hasCourt}
            done={hasEnforcement}
          />
        </div>
      </div>

      {/* Notes */}
      {c.notes && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <MessageSquare className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-amber-700 mb-1">{t.notes}</div>
            <div className="text-sm text-amber-800">{c.notes}</div>
          </div>
        </div>
      )}
    </div>
  );
}
