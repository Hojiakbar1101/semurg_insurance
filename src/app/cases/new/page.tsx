"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import AppShell from "@/components/shared/AppShell";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/utils";

const DIRECTIONS = ["Ucell", "ЙТҲ", "Асака", "Давр", "Агат", "Микромолия 2", "Микромолия 3"];

interface FieldGroupProps {
  title: string;
  children: React.ReactNode;
}

function FieldGroup({ title, children }: FieldGroupProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      </div>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
}

interface InputProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  options?: string[];
  span?: number;
}

function FormField({ label, name, type = "text", required, value, onChange, options, span }: InputProps) {
  const cls = "w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white";
  return (
    <div className={span === 2 ? "sm:col-span-2" : ""}>
      <label className="block text-xs font-medium text-gray-500 mb-1">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {options ? (
        <select name={name} value={value} onChange={onChange} className={cls}>
          <option value="">—</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={cls}
        />
      )}
    </div>
  );
}

export default function NewCasePage() {
  const { t } = useI18n();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    insured: "",
    direction: "",
    contract_number: "",
    contract_date: "",
    insurance_liability: "",
    insurance_premium: "",
    policy_series: "",
    policy_number: "",
    coverage_start: "",
    coverage_end: "",
    insurance_class: "",
    incident_date: "",
    protocol_number: "",
    protocol_date: "",
    payment_date: "",
    claim_amount: "",
    postal_expense: "",
    penalty: "",
    debtor_full_name: "",
    debtor_pinfl: "",
    debtor_passport: "",
    debtor_region: "",
    debtor_address: "",
    debtor_phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // In production: await api.create(form)
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    router.push("/cases");
  };

  return (
    <AppShell>
      <form onSubmit={handleSubmit}>
        <div className="p-4 lg:p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/cases"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-500 shadow-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <h1 className="text-xl font-bold text-gray-900">{t.addCase}</h1>
            </div>
            <button
              type="submit"
              disabled={saving}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm text-white rounded-lg transition-colors",
                saving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              )}
            >
              <Save className="w-4 h-4" />
              {saving ? t.loading : t.save}
            </button>
          </div>

          {/* Contract info */}
          <FieldGroup title={t.contractInfo}>
            <FormField label={t.insured} name="insured" required value={form.insured} onChange={handleChange} />
            <FormField label={t.direction} name="direction" required value={form.direction} onChange={handleChange} options={DIRECTIONS} />
            <FormField label={t.contractNumber} name="contract_number" value={form.contract_number} onChange={handleChange} />
            <FormField label={t.contractDate} name="contract_date" type="date" value={form.contract_date} onChange={handleChange} />
            <FormField label={t.policyNumber} name="policy_number" value={form.policy_number} onChange={handleChange} />
            <FormField label="Policy Series" name="policy_series" value={form.policy_series} onChange={handleChange} />
            <FormField label={t.insuranceLiability} name="insurance_liability" type="number" value={form.insurance_liability} onChange={handleChange} />
            <FormField label={t.insurancePremium} name="insurance_premium" type="number" value={form.insurance_premium} onChange={handleChange} />
            <FormField label={t.coverageStart} name="coverage_start" type="date" value={form.coverage_start} onChange={handleChange} />
            <FormField label={t.coverageEnd} name="coverage_end" type="date" value={form.coverage_end} onChange={handleChange} />
            <FormField label={t.insuranceClass} name="insurance_class" value={form.insurance_class} onChange={handleChange} />
          </FieldGroup>

          {/* Payment */}
          <FieldGroup title={t.paymentInfo}>
            <FormField label={t.incidentDate} name="incident_date" type="date" required value={form.incident_date} onChange={handleChange} />
            <FormField label={t.protocolNumber} name="protocol_number" type="number" required value={form.protocol_number} onChange={handleChange} />
            <FormField label={t.protocolDate} name="protocol_date" type="date" required value={form.protocol_date} onChange={handleChange} />
            <FormField label={t.paymentDate} name="payment_date" type="date" required value={form.payment_date} onChange={handleChange} />
            <FormField label={t.claimAmount} name="claim_amount" type="number" required value={form.claim_amount} onChange={handleChange} />
            <FormField label={t.postalExpense} name="postal_expense" type="number" value={form.postal_expense} onChange={handleChange} />
            <FormField label={t.penalty} name="penalty" type="number" value={form.penalty} onChange={handleChange} />
          </FieldGroup>

          {/* Debtor */}
          <FieldGroup title={t.debtorInfo}>
            <FormField label={t.fullName} name="debtor_full_name" required value={form.debtor_full_name} onChange={handleChange} />
            <FormField label={t.pinfl} name="debtor_pinfl" value={form.debtor_pinfl} onChange={handleChange} />
            <FormField label={t.passport} name="debtor_passport" value={form.debtor_passport} onChange={handleChange} />
            <FormField label={t.region} name="debtor_region" value={form.debtor_region} onChange={handleChange} />
            <FormField label={t.phone} name="debtor_phone" type="tel" value={form.debtor_phone} onChange={handleChange} />
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-medium text-gray-500 mb-1">{t.address}</label>
              <textarea
                name="debtor_address"
                value={form.debtor_address}
                onChange={handleChange}
                rows={2}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white"
              />
            </div>
          </FieldGroup>
        </div>
      </form>
    </AppShell>
  );
}
