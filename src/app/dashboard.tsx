
"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, ScatterChart, Scatter,
  ReferenceLine
} from "recharts";
import {
  BarChart3, CheckCircle, AlertCircle, Target, Mail,
  Briefcase, DollarSign, Shield, Home, Globe, Download,
  Plus, Eye, ArrowLeft, FileSpreadsheet, TrendingUp,
  TrendingDown, Users, Layers, Scale, Gavel, FileText,
  ChevronLeft, ChevronRight, Filter, X, Search, RefreshCw,
  Info, Building2, Calendar, Phone, MapPin,
  CreditCard, Hash, CheckSquare, Archive, Menu
} from "lucide-react";
import { useI18n } from "@/i18n/context";
import type { Locale } from "@/i18n/translations";

// ─── LOCALES ──────────────────────────────────────────────────────────────────
const LOCALES: { code: Locale; label: string }[] = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

// ─── THEMES ───────────────────────────────────────────────────────────────────
const THEMES = {
  midnight: {
    name: "🌙 Midnight",
    bg: "#080c14", surface: "#0d1526", surface2: "#111d35", surface3: "#162040",
    border: "rgba(99,179,237,0.08)", border2: "rgba(99,179,237,0.14)",
    text: "#e8f4fd", textSec: "#7aa8cc", textMuted: "#3d6080",
    accent: "#3b9eff", accent2: "#00d4aa", accent3: "#f472b6", accent4: "#a78bfa",
    danger: "#ff5757", success: "#00d4aa", warning: "#fbbf24",
    chartGrid: "rgba(99,179,237,0.05)", glow: "rgba(59,158,255,0.15)",
    font: "'DM Mono', monospace", fontDisplay: "'Plus Jakarta Sans', sans-serif",
  },
  aurora: {
    name: "🌌 Aurora",
    bg: "#0a0612", surface: "#120920", surface2: "#180c2e", surface3: "#1f1040",
    border: "rgba(167,139,250,0.1)", border2: "rgba(167,139,250,0.18)",
    text: "#f0e8ff", textSec: "#a78bfa", textMuted: "#5b3d8a",
    accent: "#a78bfa", accent2: "#f472b6", accent3: "#34d399", accent4: "#60a5fa",
    danger: "#f87171", success: "#34d399", warning: "#fbbf24",
    chartGrid: "rgba(167,139,250,0.05)", glow: "rgba(167,139,250,0.2)",
    font: "'DM Mono', monospace", fontDisplay: "'Plus Jakarta Sans', sans-serif",
  },
  arctic: {
    name: "❄️ Arctic",
    bg: "#f0f7ff", surface: "#ffffff", surface2: "#f8fbff", surface3: "#eef4fc",
    border: "rgba(37,99,235,0.1)", border2: "rgba(37,99,235,0.18)",
    text: "#0f1f3d", textSec: "#2563eb", textMuted: "#94a3b8",
    accent: "#2563eb", accent2: "#0891b2", accent3: "#059669", accent4: "#7c3aed",
    danger: "#dc2626", success: "#059669", warning: "#d97706",
    chartGrid: "rgba(37,99,235,0.04)", glow: "rgba(37,99,235,0.08)",
    font: "'DM Mono', monospace", fontDisplay: "'Plus Jakarta Sans', sans-serif",
  },
  carbon: {
    name: "⚫ Carbon",
    bg: "#0a0a0a", surface: "#141414", surface2: "#1a1a1a", surface3: "#202020",
    border: "rgba(255,255,255,0.07)", border2: "rgba(255,255,255,0.12)",
    text: "#f5f5f5", textSec: "#a3a3a3", textMuted: "#404040",
    accent: "#22d3ee", accent2: "#a3e635", accent3: "#f472b6", accent4: "#fb923c",
    danger: "#f87171", success: "#4ade80", warning: "#fbbf24",
    chartGrid: "rgba(255,255,255,0.04)", glow: "rgba(34,211,238,0.12)",
    font: "'DM Mono', monospace", fontDisplay: "'Plus Jakarta Sans', sans-serif",
  },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const MONTHLY = [
  { m: "Jan", cases: 45, amount: 820, returned: 120, debt: 700 },
  { m: "Feb", cases: 62, amount: 1050, returned: 180, debt: 870 },
  { m: "Mar", cases: 78, amount: 1300, returned: 220, debt: 1080 },
  { m: "Apr", cases: 95, amount: 1650, returned: 310, debt: 1340 },
  { m: "May", cases: 110, amount: 1900, returned: 380, debt: 1520 },
  { m: "Jun", cases: 88, amount: 1520, returned: 290, debt: 1230 },
  { m: "Jul", cases: 102, amount: 1780, returned: 420, debt: 1360 },
  { m: "Aug", cases: 125, amount: 2150, returned: 510, debt: 1640 },
  { m: "Sep", cases: 98, amount: 1680, returned: 350, debt: 1330 },
  { m: "Oct", cases: 135, amount: 2400, returned: 580, debt: 1820 },
  { m: "Nov", cases: 115, amount: 2100, returned: 490, debt: 1610 },
  { m: "Dec", cases: 88, amount: 1600, returned: 380, debt: 1220 },
];

const DIRECTIONS = [
  { d: "Асака", n: 755, claim: 5200, ret: 800, debt: 4400, rate: 15.4, pre: 140, court: 80, enf: 60, color: "#3b9eff" },
  { d: "Давр", n: 486, claim: 2900, ret: 350, debt: 2550, rate: 12.1, pre: 90, court: 45, enf: 30, color: "#a78bfa" },
  { d: "Агат", n: 75, claim: 980, ret: 95, debt: 885, rate: 9.7, pre: 20, court: 10, enf: 8, color: "#00d4aa" },
  { d: "ЙТҲ", n: 26, claim: 420, ret: 40, debt: 380, rate: 9.5, pre: 8, court: 4, enf: 2, color: "#fbbf24" },
  { d: "Ucell", n: 18, claim: 180, ret: 15, debt: 165, rate: 8.3, pre: 6, court: 3, enf: 2, color: "#f472b6" },
  { d: "Мкр 2", n: 12, claim: 85, ret: 3, debt: 82, rate: 3.5, pre: 4, court: 2, enf: 1, color: "#fb923c" },
  { d: "Мкр 3", n: 2, claim: 44, ret: 2, debt: 42, rate: 4.5, pre: 1, court: 1, enf: 0, color: "#ef4444" },
];

const CASES = [
  { id: 1, status: "SENT_TO_LAWYER", insured: "AGAT CREDIT AJ MFO", dir: "Агат", policy: "ESID 0022282", incident: "2025-11-28", claim: 24909265, returned: 0, debt: 24909265, debtor: "Abdullayeva Ra'noxon S.", pinfl: "42003954340031", passport: "AA 9646836", region: "Farg'ona viloyati", address: "Farg'ona viloyati Marg'ilon shahri Beshbola MFY Charxi 22", phone: null, warn: "2025-11-28", warnNum: 4133, lawsuit: null, court: null, enf: null, notes: "Sud qarori yo'q", contract_number: "02-58-254266", contract_date: "2025-01-15", insurance_liability: 30000000, insurance_premium: 500000, coverage_start: "2025-01-15", coverage_end: "2026-01-15", insurance_class: "Hayot", protocol_number: 295, protocol_date: "2025-11-28", payment_date: "2025-11-28", postal_expense: 0, penalty: 0 },
  { id: 2, status: "IN_COLLECTION", insured: "ASAKA BANK", dir: "Асака", policy: "ESID 0099999", incident: "2025-06-10", claim: 8500000, returned: 2000000, debt: 6500000, debtor: "Karimov Ali V.", pinfl: "12345678901234", passport: "AB 1234567", region: "Toshkent", address: "Chilonzor t., 5-uy", phone: "+998901234567", warn: "2025-06-20", warnNum: 4200, lawsuit: "2025-08-15", court: null, enf: null, notes: null, contract_number: "XXX-001", contract_date: "2024-03-01", insurance_liability: 50000000, insurance_premium: 500000, coverage_start: "2024-03-01", coverage_end: "2025-03-01", insurance_class: null, protocol_number: 123, protocol_date: "2025-06-10", payment_date: "2025-06-15", postal_expense: 25000, penalty: 0 },
  { id: 3, status: "FULLY_COLLECTED", insured: "DAVR BANK", dir: "Давр", policy: "DSIA 0055432", incident: "2024-05-01", claim: 15000000, returned: 15000000, debt: 0, debtor: "Toshmatov Bobur H.", pinfl: "98765432101234", passport: "BB 7654321", region: "Samarqand", address: "Samarqand, 1-ko'cha 5-uy", phone: "+998712345678", warn: "2024-05-15", warnNum: 3100, lawsuit: "2024-07-01", court: "2024-09-15", enf: "2024-10-01", notes: "To'liq undirildi", contract_number: "SAM-045", contract_date: "2023-12-01", insurance_liability: 20000000, insurance_premium: 200000, coverage_start: "2023-12-01", coverage_end: "2024-12-01", insurance_class: "Mol-mulk", protocol_number: 89, protocol_date: "2024-05-01", payment_date: "2024-05-05", postal_expense: 15000, penalty: 5000 },
  { id: 4, status: "NOT_REVIEWED", insured: "UCELL TELECOM", dir: "Ucell", policy: "UCID 0011223", incident: "2025-10-15", claim: 5500000, returned: 0, debt: 5500000, debtor: "Nazarov Jasur A.", pinfl: "11223344556677", passport: "CC 3344556", region: "Toshkent vil.", address: "Toshkent viloyati, Chirchiq shahri", phone: "+998944455667", warn: null, warnNum: null, lawsuit: null, court: null, enf: null, notes: null, contract_number: "UCL-778", contract_date: "2025-01-10", insurance_liability: 10000000, insurance_premium: 150000, coverage_start: "2025-01-10", coverage_end: "2026-01-10", insurance_class: null, protocol_number: 456, protocol_date: "2025-10-15", payment_date: "2025-10-20", postal_expense: 0, penalty: 0 },
  { id: 5, status: "ARCHIVED", insured: "MIKROMOLIYA 2", dir: "Мкр 2", policy: "MKID 0077665", incident: "2021-11-20", claim: 3200000, returned: 1500000, debt: 1700000, debtor: "Holiqova Malika T.", pinfl: "44556677889900", passport: "DD 1122334", region: "Namangan", address: "Namangan viloyati, 7-ko'cha", phone: null, warn: "2021-12-01", warnNum: 1500, lawsuit: "2022-02-15", court: "2022-05-10", enf: "2022-06-01", notes: "36 oydan ortiq", contract_number: "MKR-234", contract_date: "2021-01-01", insurance_liability: 5000000, insurance_premium: 80000, coverage_start: "2021-01-01", coverage_end: "2022-01-01", insurance_class: "Kredit", protocol_number: 200, protocol_date: "2021-11-20", payment_date: "2021-11-25", postal_expense: 10000, penalty: 2000 },
  { id: 6, status: "IN_COLLECTION", insured: "ASAKA BANK", dir: "Асака", policy: "ESID 0088765", incident: "2025-08-20", claim: 42000000, returned: 5000000, debt: 37000000, debtor: "Mirzayev Sardor B.", pinfl: "55667788990011", passport: "EE 5566778", region: "Andijon", address: "Andijon viloyati, Asaka shahri", phone: "+998917654321", warn: "2025-09-01", warnNum: 4350, lawsuit: "2025-10-15", court: null, enf: null, notes: null, contract_number: "ASK-556", contract_date: "2024-07-01", insurance_liability: 60000000, insurance_premium: 800000, coverage_start: "2024-07-01", coverage_end: "2025-07-01", insurance_class: "Hayot", protocol_number: 280, protocol_date: "2025-08-20", payment_date: "2025-08-25", postal_expense: 30000, penalty: 10000 },
  { id: 7, status: "SENT_TO_LAWYER", insured: "DAVR BANK", dir: "Давр", policy: "DSIA 0033211", incident: "2025-09-05", claim: 12500000, returned: 0, debt: 12500000, debtor: "Yusupova Nilufar A.", pinfl: "66778899001122", passport: "FF 9988776", region: "Namangan", address: "Namangan, Uychi tumani", phone: "+998935551234", warn: "2025-09-20", warnNum: 4400, lawsuit: null, court: null, enf: null, notes: null, contract_number: "DVR-889", contract_date: "2024-09-01", insurance_liability: 15000000, insurance_premium: 200000, coverage_start: "2024-09-01", coverage_end: "2025-09-01", insurance_class: null, protocol_number: 310, protocol_date: "2025-09-05", payment_date: "2025-09-10", postal_expense: 20000, penalty: 0 },
  { id: 8, status: "IN_COLLECTION", insured: "ASAKA BANK", dir: "Асака", policy: "ESID 0101010", incident: "2025-07-12", claim: 31000000, returned: 8000000, debt: 23000000, debtor: "Raximov Dilshod K.", pinfl: "77889900112233", passport: "GG 7788990", region: "Farg'ona", address: "Farg'ona viloyati, Quvasoy shahri", phone: "+998997001122", warn: "2025-07-25", warnNum: 4320, lawsuit: "2025-09-10", court: null, enf: null, notes: null, contract_number: "ASK-778", contract_date: "2024-06-15", insurance_liability: 45000000, insurance_premium: 650000, coverage_start: "2024-06-15", coverage_end: "2025-06-15", insurance_class: "Hayot", protocol_number: 270, protocol_date: "2025-07-12", payment_date: "2025-07-18", postal_expense: 28000, penalty: 8000 },
];

const SUMMARY = {
  total_cases: 1374, total_claim_amount: 9809081310, total_postal_expense: 1599400,
  total_penalty: 1002475, total_returned: 1304482320, total_remaining_debt: 8516692065,
  collection_rate_percent: 13.3,
  by_status: { NOT_REVIEWED: 952, SENT_TO_LAWYER: 35, IN_COLLECTION: 325, FULLY_COLLECTED: 62, ARCHIVED: 0 },
};

// ─── UTILS ────────────────────────────────────────────────────────────────────
const fmt = (n) => n == null ? "—" : new Intl.NumberFormat("uz-UZ").format(Math.round(n));
const fmtDate = (d) => d ? new Date(d).toLocaleDateString("ru-RU") : "—";

function exportToExcel(data, filename) {
  const headers = ["ID", "Status", "Tashkilot", "Yo'nalish", "Polis", "Qarzdor", "Pasport", "Hudud", "Hodisa sanasi", "Da'vo miqdori", "Qaytarilgan", "Qoldiq qarz", "Telefon"];
  const rows = data.map(c => [c.id, c.status, c.insured, c.dir, c.policy, c.debtor, c.passport, c.region, c.incident, c.claim, c.returned, c.debt, c.phone || ""]);
  let csv = headers.join(",") + "\n";
  rows.forEach(r => { csv += r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",") + "\n"; });
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename || "regress.csv"; a.click();
  URL.revokeObjectURL(url);
}

// ─── STATUS CONFIG ────────────────────────────────────────────────────────────
const STATUS_COLORS = {
  NOT_REVIEWED:   { bg: "#1e293b", text: "#94a3b8", dot: "#64748b" },
  SENT_TO_LAWYER: { bg: "#2d2005", text: "#fbbf24", dot: "#f59e0b" },
  IN_COLLECTION:  { bg: "#0c1a35", text: "#60a5fa", dot: "#3b82f6" },
  FULLY_COLLECTED:{ bg: "#052e1a", text: "#34d399", dot: "#10b981" },
  ARCHIVED:       { bg: "#1a1a1a", text: "#6b7280", dot: "#4b5563" },
};

// ─── COUNTER ──────────────────────────────────────────────────────────────────
function Counter({ value, prefix = "", suffix = "", decimals = 0 }) {
  const [val, setVal] = useState(0);
  const rafRef = useRef(null);
  useEffect(() => {
    const end = parseFloat(value), duration = 1400;
    let startTime = null;
    const tick = (t) => {
      if (!startTime) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      setVal((1 - Math.pow(1 - progress, 4)) * end);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value]);
  return <span>{prefix}{decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toLocaleString()}{suffix}</span>;
}

// ─── TOOLTIP ──────────────────────────────────────────────────────────────────
function ChartTooltip({ active, payload, label, theme: t, formatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: t.surface2, border: `1px solid ${t.border2}`, borderRadius: 14, padding: "12px 16px", fontFamily: t.fontDisplay, minWidth: 150 }}>
      <div style={{ color: t.textSec, fontSize: 11, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.color || p.fill }} />
          <span style={{ color: t.textSec, fontSize: 11 }}>{p.name}:</span>
          <span style={{ color: t.text, fontSize: 12, fontWeight: 700, marginLeft: "auto" }}>{formatter ? formatter(p.value, p.name) : p.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── GLOW CARD ────────────────────────────────────────────────────────────────
function GlowCard({ children, theme: t, style = {}, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}
      style={{ background: t.surface, border: `1px solid ${hov ? t.border2 : t.border}`, borderRadius: 20, transition: "all 0.3s", transform: hov && onClick ? "translateY(-2px)" : "none", boxShadow: hov ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${t.glow}` : `0 4px 20px rgba(0,0,0,0.2)`, cursor: onClick ? "pointer" : "default", position: "relative", overflow: "hidden", ...style }}>
      {hov && onClick && <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(circle at 50% 0%, ${t.glow} 0%, transparent 70%)`, opacity: 0.6 }} />}
      {children}
    </div>
  );
}

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = STATUS_COLORS[status] || STATUS_COLORS.NOT_REVIEWED;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: cfg.bg, color: cfg.text, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.dot, animation: status === "IN_COLLECTION" ? "pulse 2s infinite" : "none" }} />
      {status.replace(/_/g, " ")}
    </span>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ProgressBar({ value, max, color, theme: t }) {
  const [w, setW] = useState(0);
  const pct = Math.min(100, max > 0 ? (value / max) * 100 : 0);
  useEffect(() => { const tm = setTimeout(() => setW(pct), 200); return () => clearTimeout(tm); }, [pct]);
  return (
    <div style={{ height: 6, background: t.surface3, borderRadius: 99, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${w}%`, borderRadius: 99, background: `linear-gradient(90deg, ${color}, ${color}cc)`, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 12px ${color}60` }} />
    </div>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ title, value, sub, Icon, trend, color, color2, sparkData, theme: t, delay = 0, onClick }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const tm = setTimeout(() => setVis(true), delay); return () => clearTimeout(tm); }, [delay]);
  return (
    <GlowCard theme={t} onClick={onClick} style={{ padding: 0, opacity: vis ? 1 : 0, transition: `all 0.5s ease ${delay}ms` }}>
      <div style={{ padding: "18px 18px 14px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
          <a href="#" onClick={e => { e.preventDefault(); onClick && onClick(); }} style={{ width: 40, height: 40, borderRadius: 13, background: `linear-gradient(135deg, ${color}, ${color2 || color})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 24px ${color}40`, flexShrink: 0, textDecoration: "none" }}>
            {Icon && <Icon size={19} color="#fff" strokeWidth={2} />}
          </a>
          {trend != null && (
            <div style={{ display: "flex", alignItems: "center", gap: 3, padding: "3px 8px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: trend >= 0 ? `${t.success}18` : `${t.danger}18`, color: trend >= 0 ? t.success : t.danger, border: `1px solid ${trend >= 0 ? t.success : t.danger}30` }}>
              {trend >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />} {Math.abs(trend)}%
            </div>
          )}
        </div>
        <div style={{ fontFamily: t.fontDisplay, fontWeight: 900, fontSize: 24, color: t.text, lineHeight: 1, marginBottom: 4 }}>{value}</div>
        <div style={{ fontSize: 12, color: t.textSec, fontWeight: 600, marginBottom: 2 }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: t.textMuted }}>{sub}</div>}
      </div>
      {sparkData && (
        <div style={{ height: 44, marginTop: -4 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData.map((v, i) => ({ i, v }))} margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
              <defs><linearGradient id={`sg${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.4} /><stop offset="100%" stopColor={color} stopOpacity={0} /></linearGradient></defs>
              <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#sg${color.replace("#", "")})`} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </GlowCard>
  );
}

// ─── STAT DETAIL MODAL ────────────────────────────────────────────────────────
function StatDetailModal({ type, theme: t, onClose, tl }) {
  if (!type) return null;
  const details = {
    cases: { title: tl?.totalCases || "Total Cases", icon: BarChart3, color: t.accent, data: Object.entries(SUMMARY.by_status).map(([k, v]) => ({ label: k.replace(/_/g, " "), value: v, color: STATUS_COLORS[k]?.dot || "#666" })), chartData: MONTHLY.map(m => ({ name: m.m, value: m.cases })), info: `Jami: ${fmt(SUMMARY.total_cases)} ta` },
    claim: { title: tl?.totalClaim || "Total Claim", icon: DollarSign, color: t.accent4, data: DIRECTIONS.map(d => ({ label: d.d, value: d.claim * 1000000, color: d.color })), chartData: MONTHLY.map(m => ({ name: m.m, value: m.amount })), info: `${fmt(SUMMARY.total_claim_amount)} UZS` },
    returned: { title: tl?.totalReturned || "Returned", icon: CheckCircle, color: t.success, data: DIRECTIONS.map(d => ({ label: d.d, value: d.ret * 1000000, color: d.color })), chartData: MONTHLY.map(m => ({ name: m.m, value: m.returned })), info: `${fmt(SUMMARY.total_returned)} UZS` },
    debt: { title: tl?.remainingDebt || "Remaining Debt", icon: AlertCircle, color: t.danger, data: DIRECTIONS.map(d => ({ label: d.d, value: d.debt * 1000000, color: d.color })), chartData: MONTHLY.map(m => ({ name: m.m, value: m.debt })), info: `${fmt(SUMMARY.total_remaining_debt)} UZS` },
    rate: { title: tl?.collectionRate || "Collection Rate", icon: Target, color: t.warning, data: DIRECTIONS.map(d => ({ label: d.d, value: d.rate, color: d.color, isPercent: true })), chartData: DIRECTIONS.map(d => ({ name: d.d, value: d.rate })), info: `O'rtacha: ${SUMMARY.collection_rate_percent}%` },
    postal: { title: (tl?.postalExpense || "Postal") + " & " + (tl?.penalty || "Penalty"), icon: Mail, color: t.accent3, data: [{ label: tl?.postalExpense || "Postal", value: SUMMARY.total_postal_expense, color: t.accent3 }, { label: tl?.penalty || "Penalty", value: SUMMARY.total_penalty, color: t.warning }], chartData: MONTHLY.map((m, i) => ({ name: m.m, value: 133000 + i * 5000 })), info: `${fmt(SUMMARY.total_postal_expense + SUMMARY.total_penalty)} UZS` },
  };
  const d = details[type];
  if (!d) return null;
  const Icon = d.icon;
  const maxVal = Math.max(...d.data.map(x => x.value), 1);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", padding: 16 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: t.surface, border: `1px solid ${t.border2}`, borderRadius: 24, width: "100%", maxWidth: 660, maxHeight: "90vh", overflow: "auto", boxShadow: `0 40px 100px rgba(0,0,0,0.6)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 22px", borderBottom: `1px solid ${t.border}` }}>
          <div style={{ width: 46, height: 46, borderRadius: 15, background: `${d.color}20`, border: `1px solid ${d.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={22} color={d.color} strokeWidth={2} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: t.text, fontSize: 18, fontWeight: 900, margin: 0, fontFamily: t.fontDisplay }}>{d.title}</h2>
            <p style={{ color: t.textMuted, fontSize: 12, margin: "2px 0 0" }}>{d.info}</p>
          </div>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 10, border: `1px solid ${t.border}`, background: "transparent", color: t.textSec, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={15} /></button>
        </div>
        <div style={{ padding: 22 }}>
          <div style={{ marginBottom: 22, background: t.surface2, borderRadius: 14, padding: "14px 14px 6px", border: `1px solid ${t.border}` }}>
            <div style={{ color: t.textSec, fontSize: 11, fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Trend</div>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={d.chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={d.color} stopOpacity={0.4} /><stop offset="100%" stopColor={d.color} stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="4 4" stroke={t.chartGrid} vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: t.textMuted }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: t.textMuted }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip theme={t} />} />
                <Area type="monotone" dataKey="value" stroke={d.color} strokeWidth={2.5} fill="url(#mg)" dot={false} activeDot={{ r: 5, fill: d.color }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ color: t.textSec, fontSize: 11, fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Tafsilot</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {d.data.map((item, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: item.color }} />
                    <span style={{ color: t.textSec, fontSize: 13, fontWeight: 600 }}>{item.label}</span>
                  </div>
                  <span style={{ color: t.text, fontSize: 13, fontWeight: 800, fontFamily: t.font }}>{item.isPercent ? `${item.value}%` : fmt(item.value)}</span>
                </div>
                <ProgressBar value={item.value} max={maxVal} color={item.color} theme={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const { locale, setLocale, t: tl } = useI18n();
  const [themeKey, setThemeKey] = useState("midnight");
  const [page, setPage] = useState("dashboard");
  const [selectedCase, setSelectedCase] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statModal, setStatModal] = useState(null);
  const [filters, setFilters] = useState({ search: "", status: "", dir: "", page: 1, limit: 10 });
  const [showFilters, setShowFilters] = useState(false);
  const [chartView, setChartView] = useState("area");
  const t = THEMES[themeKey];

  const navigate = (p, caseId = null) => {
    setPage(p);
    if (caseId !== null) setSelectedCase(caseId);
    setSidebarOpen(false);
  };

  const axCfg = { fontSize: 11, fill: t.textMuted, fontFamily: t.font };
  const gridCfg = { strokeDasharray: "4 4", stroke: t.chartGrid, vertical: false };
  const sparkCases = MONTHLY.map(m => m.cases);
  const sparkAmount = MONTHLY.map(m => m.amount);
  const sparkRet = MONTHLY.map(m => m.returned);

  // ─── SIDEBAR ──────────────────────────────────────────────────────────────────
  const Sidebar = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: t.fontDisplay }}>
      <div style={{ padding: "18px 14px 16px", borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a href="#" onClick={e => { e.preventDefault(); navigate("dashboard"); }} style={{ width: 38, height: 38, borderRadius: 12, background: `linear-gradient(135deg, ${t.accent}, ${t.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 24px ${t.accent}40`, textDecoration: "none", flexShrink: 0 }}>
            <Shield size={17} color="#fff" strokeWidth={2} />
          </a>
          <div>
            <div style={{ color: t.text, fontWeight: 900, fontSize: 14 }}>SEMUR</div>
            <div style={{ color: t.textMuted, fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Insurance · Regress</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "10px 8px" }}>
        {[{ id: "dashboard", Icon: Home, label: tl?.dashboard || "Dashboard" }, { id: "cases", Icon: Briefcase, label: tl?.cases || "Cases" }].map(item => {
          const active = page === item.id || (item.id === "cases" && ["case-detail","new-case"].includes(page));
          return (
            <a key={item.id} href="#" onClick={e => { e.preventDefault(); navigate(item.id); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 13px", borderRadius: 11, marginBottom: 4, background: active ? `linear-gradient(135deg, ${t.accent}22, ${t.accent2}11)` : "transparent", color: active ? t.accent : t.textSec, fontFamily: t.fontDisplay, fontSize: 13, fontWeight: 600, borderLeft: active ? `2px solid ${t.accent}` : "2px solid transparent", transition: "all 0.2s", textDecoration: "none" }}>
              <item.Icon size={15} strokeWidth={2} /> {item.label}
            </a>
          );
        })}
      </nav>
      <div style={{ padding: "8px 8px 6px", borderTop: `1px solid ${t.border}` }}>
        <a href="#" onClick={e => { e.preventDefault(); navigate("new-case"); }} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 13px", borderRadius: 11, border: `1px solid ${t.border2}`, background: "transparent", color: t.textSec, fontFamily: t.fontDisplay, fontSize: 12, fontWeight: 600, textDecoration: "none", marginBottom: 5, transition: "all 0.2s" }}>
          <Plus size={15} strokeWidth={2} /> {tl?.addCase || "New Case"}
        </a>
        <a href="#" onClick={e => { e.preventDefault(); exportToExcel(CASES, "regress-export.csv"); }} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 13px", borderRadius: 11, border: "none", background: "transparent", color: t.textSec, fontFamily: t.fontDisplay, fontSize: 12, fontWeight: 600, textDecoration: "none", transition: "all 0.2s" }}>
          <Download size={15} strokeWidth={2} /> {tl?.export || "Excel Export"}
        </a>
      </div>
      <div style={{ padding: "10px 14px 14px", borderTop: `1px solid ${t.border}` }}>
        <div style={{ color: t.textMuted, fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 7 }}>Theme</div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {Object.entries(THEMES).map(([key, th]) => (
            <button key={key} onClick={() => setThemeKey(key)} title={th.name} style={{ width: 24, height: 24, borderRadius: 7, border: `2px solid ${themeKey === key ? t.accent : "transparent"}`, background: th.bg, cursor: "pointer", transition: "all 0.2s", transform: themeKey === key ? "scale(1.15)" : "scale(1)" }} />
          ))}
        </div>
      </div>
    </div>
  );

  // ─── DASHBOARD ────────────────────────────────────────────────────────────────
  const DashboardPage = () => {
    const [dirMetric, setDirMetric] = useState("claim");
    const STATUS_PIE = [
      { name: tl?.status?.NOT_REVIEWED || "Not Reviewed", value: 952, color: "#64748b" },
      { name: tl?.status?.SENT_TO_LAWYER || "Sent to Lawyer", value: 35, color: "#fbbf24" },
      { name: tl?.status?.IN_COLLECTION || "In Collection", value: 325, color: "#3b9eff" },
      { name: tl?.status?.FULLY_COLLECTED || "Fully Collected", value: 62, color: "#10b981" },
    ];
    return (
      <div style={{ padding: "18px 18px 36px", fontFamily: t.fontDisplay }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
          <div>
            <h1 style={{ color: t.text, fontSize: 22, fontWeight: 900, letterSpacing: "-0.03em", margin: 0 }}>Regress <span style={{ color: t.accent }}>Portfolio</span></h1>
            <p style={{ color: t.textMuted, fontSize: 12, margin: "3px 0 0" }}>SEMUR Insurance · 2025 · 1 374 ta ish</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <a href="#" onClick={e => { e.preventDefault(); exportToExcel(CASES, "regress-dashboard.csv"); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 13px", borderRadius: 11, border: `1px solid ${t.border2}`, background: "transparent", color: t.textSec, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
              <FileSpreadsheet size={13} strokeWidth={2} /> {tl?.export || "Excel"}
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 11px", borderRadius: 20, border: `1px solid ${t.success}40`, background: `${t.success}12`, color: t.success, fontSize: 11, fontWeight: 700 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.success, animation: "pulse 2s infinite" }} /> Live
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 11, marginBottom: 18 }}>
          <StatCard title={tl?.totalCases || "Total Cases"} value={<Counter value={1374} />} sub="+115 Nov" Icon={BarChart3} trend={8} color={t.accent} color2={t.accent4} sparkData={sparkCases} theme={t} delay={0} onClick={() => setStatModal("cases")} />
          <StatCard title={tl?.totalClaim || "Total Claim"} value={<Counter value={9.81} suffix="B" decimals={2} />} sub="9,809,081,310 UZS" Icon={DollarSign} trend={12} color={t.accent4} color2="#7c3aed" sparkData={sparkAmount} theme={t} delay={80} onClick={() => setStatModal("claim")} />
          <StatCard title={tl?.totalReturned || "Returned"} value={<Counter value={1.30} suffix="B" decimals={2} />} sub="1,304,482,320 UZS" Icon={CheckCircle} trend={5} color={t.success} color2="#059669" sparkData={sparkRet} theme={t} delay={160} onClick={() => setStatModal("returned")} />
          <StatCard title={tl?.remainingDebt || "Remaining Debt"} value={<Counter value={8.52} suffix="B" decimals={2} />} sub="8,516,692,065 UZS" Icon={AlertCircle} trend={-3} color={t.danger} color2="#c2410c" theme={t} delay={240} onClick={() => setStatModal("debt")} />
          <StatCard title={tl?.collectionRate || "Collection Rate"} value={<Counter value={13.3} suffix="%" decimals={1} />} sub="Portfolio efficiency" Icon={Target} trend={2} color={t.warning} color2="#d97706" theme={t} delay={320} onClick={() => setStatModal("rate")} />
          <StatCard title={(tl?.postalExpense || "Postal") + " + " + (tl?.penalty || "Penalty")} value={<Counter value={2.6} suffix="M" decimals={1} />} sub="Qo'shimcha xarajat" Icon={Mail} color={t.accent3} color2="#0891b2" theme={t} delay={400} onClick={() => setStatModal("postal")} />
        </div>

        {/* Chart + Status row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr min(340px, 100%)", gap: 12, marginBottom: 12 }}>
          <GlowCard theme={t} style={{ padding: "18px 18px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ color: t.text, fontWeight: 800, fontSize: 14 }}>{tl?.monthlyDynamics || "Monthly Dynamics"}</div>
                <div style={{ color: t.textMuted, fontSize: 11, marginTop: 2 }}>Da&apos;vo · Qaytarilgan · Qoldiq (M UZS)</div>
              </div>
              <div style={{ display: "flex", gap: 4, background: t.surface2, borderRadius: 10, padding: 3 }}>
                {[["area","≋"], ["bar","▌"], ["line","―"]].map(([v, l]) => (
                  <button key={v} onClick={() => setChartView(v)} style={{ padding: "4px 9px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, background: chartView === v ? t.accent : "transparent", color: chartView === v ? "#fff" : t.textMuted }}>{l}</button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              {chartView === "area" ? (
                <ComposedChart data={MONTHLY} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ga1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={t.accent} stopOpacity={0.35} /><stop offset="100%" stopColor={t.accent} stopOpacity={0} /></linearGradient>
                    <linearGradient id="ga2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={t.success} stopOpacity={0.3} /><stop offset="100%" stopColor={t.success} stopOpacity={0} /></linearGradient>
                    <linearGradient id="ga3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={t.danger} stopOpacity={0.25} /><stop offset="100%" stopColor={t.danger} stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid {...gridCfg} /><XAxis dataKey="m" tick={axCfg} axisLine={false} tickLine={false} /><YAxis tick={axCfg} axisLine={false} tickLine={false} tickFormatter={v => `${v}M`} />
                  <Tooltip content={<ChartTooltip theme={t} formatter={v => `${v}M UZS`} />} />
                  <Area type="monotone" dataKey="amount" name="Da'vo" stroke={t.accent} strokeWidth={2.5} fill="url(#ga1)" dot={false} activeDot={{ r: 5 }} />
                  <Area type="monotone" dataKey="returned" name="Qaytarilgan" stroke={t.success} strokeWidth={2} fill="url(#ga2)" dot={false} activeDot={{ r: 4 }} />
                  <Area type="monotone" dataKey="debt" name="Qoldiq" stroke={t.danger} strokeWidth={2} fill="url(#ga3)" dot={false} activeDot={{ r: 4 }} />
                </ComposedChart>
              ) : chartView === "bar" ? (
                <BarChart data={MONTHLY} margin={{ top: 5, right: 5, left: -15, bottom: 0 }} barCategoryGap="30%">
                  <CartesianGrid {...gridCfg} /><XAxis dataKey="m" tick={axCfg} axisLine={false} tickLine={false} /><YAxis tick={axCfg} axisLine={false} tickLine={false} tickFormatter={v => `${v}M`} />
                  <Tooltip content={<ChartTooltip theme={t} formatter={v => `${v}M`} />} />
                  <Bar dataKey="amount" name="Da'vo" fill={t.accent} radius={[4, 4, 0, 0]} maxBarSize={16} />
                  <Bar dataKey="returned" name="Qaytarilgan" fill={t.success} radius={[4, 4, 0, 0]} maxBarSize={16} />
                  <Bar dataKey="debt" name="Qoldiq" fill={t.danger} radius={[4, 4, 0, 0]} maxBarSize={16} />
                </BarChart>
              ) : (
                <LineChart data={MONTHLY} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                  <CartesianGrid {...gridCfg} /><XAxis dataKey="m" tick={axCfg} axisLine={false} tickLine={false} /><YAxis tick={axCfg} axisLine={false} tickLine={false} tickFormatter={v => `${v}M`} />
                  <Tooltip content={<ChartTooltip theme={t} formatter={v => `${v}M`} />} />
                  <Line type="monotone" dataKey="amount" name="Da'vo" stroke={t.accent} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="returned" name="Qaytarilgan" stroke={t.success} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="debt" name="Qoldiq" stroke={t.danger} strokeWidth={2} dot={false} activeDot={{ r: 4 }} strokeDasharray="5 3" />
                </LineChart>
              )}
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 14, marginTop: 8, paddingLeft: 6, flexWrap: "wrap" }}>
              {[[t.accent,"Da'vo"],[t.success,"Qaytarilgan"],[t.danger,"Qoldiq"]].map(([col,label]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 16, height: 3, borderRadius: 2, background: col }} />
                  <span style={{ color: t.textMuted, fontSize: 11 }}>{label}</span>
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard theme={t} style={{ padding: "18px 16px 12px" }} onClick={() => setStatModal("cases")}>
            <div style={{ color: t.text, fontWeight: 800, fontSize: 14, marginBottom: 3 }}>{tl?.byStatus || "By Status"}</div>
            <div style={{ color: t.textMuted, fontSize: 11, marginBottom: 10 }}>Status Distribution</div>
            <div style={{ position: "relative" }}>
              <ResponsiveContainer width="100%" height={170}>
                <PieChart>
                  <Pie data={STATUS_PIE} cx="50%" cy="50%" innerRadius={55} outerRadius={78} paddingAngle={3} dataKey="value" strokeWidth={0}>
                    {STATUS_PIE.map((s, i) => <Cell key={i} fill={s.color} />)}
                  </Pie>
                  <Tooltip content={<ChartTooltip theme={t} />} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", flexDirection: "column" }}>
                <div style={{ color: t.text, fontSize: 22, fontWeight: 900, lineHeight: 1 }}>1374</div>
                <div style={{ color: t.textMuted, fontSize: 9, fontWeight: 600, textTransform: "uppercase" }}>Jami</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 6 }}>
              {STATUS_PIE.map(s => (
                <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, color: t.textSec, fontSize: 11 }}>{s.name}</span>
                  <span style={{ color: t.text, fontSize: 12, fontWeight: 800 }}>{s.value}</span>
                  <span style={{ color: t.textMuted, fontSize: 10, minWidth: 28, textAlign: "right" }}>{((s.value/1374)*100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>

        {/* Directions + Rate */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 270px", gap: 12 }}>
          <GlowCard theme={t} style={{ padding: "18px 18px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ color: t.text, fontWeight: 800, fontSize: 14 }}>{tl?.byDirection || "By Direction"}</div>
                <div style={{ color: t.textMuted, fontSize: 11 }}>Direction Performance</div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {[["claim","Da'vo"],["debt","Qoldiq"],["rate","Foiz"]].map(([v,l]) => (
                  <button key={v} onClick={() => setDirMetric(v)} style={{ padding: "3px 9px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700, background: dirMetric === v ? t.accent : t.surface3, color: dirMetric === v ? "#fff" : t.textMuted, fontFamily: t.fontDisplay }}>{l}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {DIRECTIONS.map((d, i) => {
                const maxVal = dirMetric === "claim" ? 5200 : dirMetric === "debt" ? 4400 : 15.4;
                const val = dirMetric === "claim" ? d.claim : dirMetric === "debt" ? d.debt : d.rate;
                return (
                  <div key={d.d} style={{ opacity: 0, animation: `fadeIn 0.4s ease ${i*60}ms forwards` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: d.color }} />
                        <span style={{ color: t.textSec, fontSize: 12, fontWeight: 600 }}>{d.d}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <span style={{ color: t.text, fontSize: 12, fontWeight: 800 }}>{dirMetric === "rate" ? `${val}%` : `${val}M`}</span>
                        <span style={{ color: t.textMuted, fontSize: 11 }}>({d.n} ish)</span>
                      </div>
                    </div>
                    <ProgressBar value={val} max={maxVal} color={d.color} theme={t} />
                  </div>
                );
              })}
            </div>
          </GlowCard>

          <GlowCard theme={t} style={{ padding: "18px 16px" }} onClick={() => setStatModal("rate")}>
            <div style={{ color: t.text, fontWeight: 800, fontSize: 14, marginBottom: 12 }}>Collection Rate</div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <svg width={145} height={82} viewBox="0 0 160 90">
                <defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={t.accent} /><stop offset="100%" stopColor={t.success} /></linearGradient></defs>
                <path d="M 20 80 A 60 60 0 0 1 140 80" fill="none" stroke={t.surface3} strokeWidth={14} strokeLinecap="round" />
                <path d="M 20 80 A 60 60 0 0 1 140 80" fill="none" stroke="url(#gg)" strokeWidth={14} strokeLinecap="round" strokeDasharray={`${188.5*0.133} ${188.5}`} />
                <text x="80" y="72" textAnchor="middle" fill={t.text} fontSize={22} fontWeight={900} fontFamily={t.fontDisplay}>13.3%</text>
                <text x="80" y="86" textAnchor="middle" fill={t.textMuted} fontSize={9} fontFamily={t.fontDisplay}>COLLECTION RATE</text>
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { l: tl?.preCourt || "Pre-Court", count: 264, amt: "2.3B", color: t.warning, pct: 58 },
                { l: tl?.court || "Court", count: 125, amt: "1.8B", color: t.accent, pct: 27 },
                { l: tl?.enforcement || "Enforcement", count: 103, amt: "1.4B", color: t.success, pct: 23 },
              ].map(s => (
                <div key={s.l}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: t.textSec, fontSize: 11 }}>{s.l}</span>
                    <div style={{ display: "flex", gap: 5 }}>
                      <span style={{ color: t.text, fontSize: 11, fontWeight: 800 }}>{s.count}</span>
                      <span style={{ color: t.textMuted, fontSize: 10 }}>{s.amt}</span>
                    </div>
                  </div>
                  <ProgressBar value={s.pct} max={100} color={s.color} theme={t} />
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>
    );
  };

  // ─── CASES LIST ───────────────────────────────────────────────────────────────
  const CasesListPage = () => {
    const [localF, setLocalF] = useState(filters);
    const filtered = useMemo(() => {
      let d = [...CASES];
      if (filters.status) d = d.filter(c => c.status === filters.status);
      if (filters.dir) d = d.filter(c => c.dir === filters.dir);
      if (filters.search) { const q = filters.search.toLowerCase(); d = d.filter(c => c.debtor.toLowerCase().includes(q) || c.passport.toLowerCase().includes(q) || c.insured.toLowerCase().includes(q)); }
      return d;
    }, []);
    const totalPages = Math.ceil(filtered.length / filters.limit);
    const paged = filtered.slice((filters.page-1)*filters.limit, filters.page*filters.limit);
    const apply = () => { setFilters({ ...localF, page: 1 }); setShowFilters(false); };
    const reset = () => { const r = { search: "", status: "", dir: "", page: 1, limit: 10 }; setLocalF(r); setFilters(r); };
    const is = { width: "100%", background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 10, color: t.text, padding: "8px 11px", fontSize: 13, fontFamily: t.fontDisplay, outline: "none", boxSizing: "border-box" };
    const th = { padding: "10px 11px", color: t.textMuted, fontSize: 10, fontWeight: 700, textAlign: "left", textTransform: "uppercase", whiteSpace: "nowrap", borderBottom: `1px solid ${t.border}` };

    return (
      <div style={{ padding: "18px", fontFamily: t.fontDisplay }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
          <div>
            <h1 style={{ color: t.text, fontSize: 20, fontWeight: 900, letterSpacing: "-0.03em", margin: 0 }}>Regress <span style={{ color: t.accent }}>Cases</span></h1>
            <p style={{ color: t.textMuted, fontSize: 12, margin: "3px 0 0" }}>Jami: {filtered.length} ta yozuv</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a href="#" onClick={e => { e.preventDefault(); exportToExcel(filtered, `regress-${new Date().toISOString().slice(0,10)}.csv`); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 13px", borderRadius: 11, border: `1px solid ${t.success}40`, background: `${t.success}10`, color: t.success, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>
              <FileSpreadsheet size={13} strokeWidth={2} /> {tl?.export || "Excel"}
            </a>
            <a href="#" onClick={e => { e.preventDefault(); navigate("new-case"); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 13px", borderRadius: 11, border: "none", background: `linear-gradient(135deg, ${t.accent}, ${t.accent2})`, color: "#fff", fontSize: 12, fontWeight: 700, textDecoration: "none", boxShadow: `0 6px 18px ${t.accent}40` }}>
              <Plus size={13} strokeWidth={2} /> {tl?.addCase || "New"}
            </a>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
            <Search size={13} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: t.textMuted }} />
            <input placeholder={tl?.searchPlaceholder || "Search..."} value={localF.search} onChange={e => setLocalF(f => ({ ...f, search: e.target.value }))} onKeyDown={e => e.key === "Enter" && apply()} style={{ ...is, paddingLeft: 33 }} />
          </div>
          <button onClick={() => setShowFilters(v => !v)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "8px 13px", borderRadius: 10, border: `1px solid ${showFilters ? t.accent : t.border}`, background: showFilters ? `${t.accent}18` : "transparent", color: showFilters ? t.accent : t.textSec, cursor: "pointer", fontFamily: t.fontDisplay, fontSize: 12, fontWeight: 600 }}>
            <Filter size={13} strokeWidth={2} /> {tl?.filters || "Filters"}
          </button>
          {(localF.status || localF.dir || localF.search) && (
            <button onClick={reset} style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 12px", borderRadius: 10, border: `1px solid ${t.danger}40`, background: `${t.danger}12`, color: t.danger, cursor: "pointer", fontFamily: t.fontDisplay, fontSize: 11, fontWeight: 600 }}>
              <X size={11} strokeWidth={2} /> Reset
            </button>
          )}
        </div>

        {showFilters && (
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 13, padding: 13, marginBottom: 12, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 9 }}>
            <div>
              <label style={{ color: t.textMuted, fontSize: 9, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 5 }}>Status</label>
              <select value={localF.status} onChange={e => setLocalF(f => ({ ...f, status: e.target.value }))} style={is}>
                <option value="">Hammasi</option>
                {Object.keys(STATUS_COLORS).map(k => <option key={k} value={k}>{k.replace(/_/g," ")}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: t.textMuted, fontSize: 9, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 5 }}>{tl?.direction || "Direction"}</label>
              <select value={localF.dir} onChange={e => setLocalF(f => ({ ...f, dir: e.target.value }))} style={is}>
                <option value="">Hammasi</option>
                {DIRECTIONS.map(d => <option key={d.d} value={d.d}>{d.d}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 7 }}>
              <button onClick={apply} style={{ flex: 1, padding: "8px", borderRadius: 10, border: "none", background: t.accent, color: "#fff", cursor: "pointer", fontFamily: t.fontDisplay, fontSize: 12, fontWeight: 700 }}>{tl?.applyFilters || "Apply"}</button>
              <button onClick={() => setShowFilters(false)} style={{ flex: 1, padding: "8px", borderRadius: 10, border: `1px solid ${t.border}`, background: "transparent", color: t.textSec, cursor: "pointer", fontFamily: t.fontDisplay, fontSize: 12 }}>{tl?.close || "Close"}</button>
            </div>
          </div>
        )}

        <GlowCard theme={t} style={{ overflow: "hidden", padding: 0 }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 650 }}>
              <thead>
                <tr style={{ background: t.surface2 }}>
                  <th style={{ ...th, width: 48 }}>ID</th>
                  <th style={th}>Status</th>
                  <th style={th}>{tl?.insured || "Insured"}</th>
                  <th style={th}>{tl?.direction || "Dir."}</th>
                  <th style={th}>{tl?.debtor || "Debtor"}</th>
                  <th style={{ ...th, textAlign: "right" }}>{tl?.claimAmount || "Claim"}</th>
                  <th style={{ ...th, textAlign: "right" }}>{tl?.remainingDebtCol || "Debt"}</th>
                  <th style={{ ...th, textAlign: "center" }}>%</th>
                  <th style={{ ...th, textAlign: "center" }}>{tl?.actions || "View"}</th>
                </tr>
              </thead>
              <tbody>
                {paged.map(c => {
                  const pct = c.claim > 0 ? Math.round((c.returned/c.claim)*100) : 0;
                  return (
                    <tr key={c.id} onClick={() => navigate("case-detail", c.id)} style={{ borderBottom: `1px solid ${t.border}`, cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = t.surface2}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td style={{ padding: "11px 11px", color: t.textMuted, fontSize: 12, fontFamily: t.font, fontWeight: 700 }}>#{c.id}</td>
                      <td style={{ padding: "11px 11px" }}><StatusBadge status={c.status} /></td>
                      <td style={{ padding: "11px 11px", color: t.text, fontSize: 12, fontWeight: 600, maxWidth: 110, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.insured}</td>
                      <td style={{ padding: "11px 11px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                          <span style={{ width: 7, height: 7, borderRadius: "50%", background: DIRECTIONS.find(d => d.d === c.dir)?.color || t.textMuted }} />
                          <span style={{ color: t.textSec, fontSize: 12 }}>{c.dir}</span>
                        </span>
                      </td>
                      <td style={{ padding: "11px 11px", maxWidth: 130 }}>
                        <div style={{ color: t.text, fontSize: 12, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.debtor}</div>
                        <div style={{ color: t.textMuted, fontSize: 10, fontFamily: t.font }}>{c.passport}</div>
                      </td>
                      <td style={{ padding: "11px 11px", textAlign: "right", color: t.text, fontSize: 12, fontWeight: 800, fontFamily: t.font, whiteSpace: "nowrap" }}>{fmt(c.claim)}</td>
                      <td style={{ padding: "11px 11px", textAlign: "right", fontSize: 12, fontWeight: 800, fontFamily: t.font, color: c.debt === 0 ? t.success : t.danger, whiteSpace: "nowrap" }}>{fmt(c.debt)}</td>
                      <td style={{ padding: "11px 11px", width: 85 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <div style={{ flex: 1, height: 5, background: t.surface3, borderRadius: 99, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? t.success : pct > 50 ? t.warning : t.accent, borderRadius: 99 }} />
                          </div>
                          <span style={{ color: t.textMuted, fontSize: 10, minWidth: 24, textAlign: "right" }}>{pct}%</span>
                        </div>
                      </td>
                      <td style={{ padding: "11px 11px", textAlign: "center" }}>
                        <a href="#" onClick={e => { e.preventDefault(); e.stopPropagation(); navigate("case-detail", c.id); }} style={{ width: 30, height: 30, borderRadius: 8, background: `${t.accent}15`, display: "inline-flex", alignItems: "center", justifyContent: "center", color: t.accent, textDecoration: "none" }}>
                          <Eye size={13} strokeWidth={2} />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderTop: `1px solid ${t.border}`, flexWrap: "wrap", gap: 8 }}>
              <span style={{ color: t.textMuted, fontSize: 12 }}>{tl?.page || "Page"} {filters.page} / {totalPages}</span>
              <div style={{ display: "flex", gap: 4 }}>
                <button onClick={() => setFilters(f => ({ ...f, page: Math.max(1, f.page-1) }))} disabled={filters.page<=1} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${t.border}`, background: "transparent", color: t.textSec, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: filters.page<=1 ? 0.3 : 1 }}>
                  <ChevronLeft size={13} />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = i+1;
                  return <button key={p} onClick={() => setFilters(f => ({ ...f, page: p }))} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${p === filters.page ? t.accent : t.border}`, background: p === filters.page ? t.accent : "transparent", color: p === filters.page ? "#fff" : t.textSec, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>{p}</button>;
                })}
                <button onClick={() => setFilters(f => ({ ...f, page: Math.min(totalPages, f.page+1) }))} disabled={filters.page>=totalPages} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${t.border}`, background: "transparent", color: t.textSec, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: filters.page>=totalPages ? 0.3 : 1 }}>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          )}
        </GlowCard>
      </div>
    );
  };

  // ─── CASE DETAIL ──────────────────────────────────────────────────────────────
  const CaseDetailPage = () => {
    const c = CASES.find(x => x.id === selectedCase);
    if (!c) return <div style={{ padding: 40, textAlign: "center", color: t.textMuted }}>Topilmadi</div>;
    const pct = c.claim > 0 ? Math.round((c.returned/c.claim)*100) : 0;

    const Section = ({ title, SIcon, color, children }) => (
      <GlowCard theme={t} style={{ padding: 0, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "13px 16px", borderBottom: `1px solid ${t.border}` }}>
          <span style={{ width: 30, height: 30, borderRadius: 9, background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {SIcon && <SIcon size={15} color={color} strokeWidth={2} />}
          </span>
          <span style={{ color: t.text, fontWeight: 800, fontSize: 14 }}>{title}</span>
        </div>
        <div style={{ padding: "13px 16px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(135px, 1fr))", gap: "11px 16px" }}>{children}</div>
      </GlowCard>
    );

    const F = ({ label, value, mono = false, color: col, span = false, FIcon }) => (
      <div style={span ? { gridColumn: "1 / -1" } : {}}>
        <div style={{ color: t.textMuted, fontSize: 9, fontWeight: 700, textTransform: "uppercase", marginBottom: 4, display: "flex", alignItems: "center", gap: 3 }}>
          {FIcon && <FIcon size={9} color={t.textMuted} />} {label}
        </div>
        <div style={{ color: col || t.text, fontSize: 13, fontWeight: 700, fontFamily: mono ? t.font : t.fontDisplay }}>{value || "—"}</div>
      </div>
    );

    const steps = [
      { Icon: FileText, title: tl?.warningLetter || "Warning Letter", date: c.warn, num: c.warnNum, done: !!c.warn },
      { Icon: Scale, title: tl?.lawsuit || "Lawsuit", date: c.lawsuit, done: !!c.lawsuit },
      { Icon: Gavel, title: tl?.courtDecision || "Court Decision", date: c.court, done: !!c.court },
      { Icon: Shield, title: tl?.enforcementOrder || "Enforcement", date: c.enf, done: !!c.enf },
    ];

    return (
      <div style={{ padding: "18px", fontFamily: t.fontDisplay }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <a href="#" onClick={e => { e.preventDefault(); navigate("cases"); }} style={{ width: 36, height: 36, borderRadius: 11, border: `1px solid ${t.border}`, background: "transparent", color: t.textSec, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
              <ArrowLeft size={15} strokeWidth={2} />
            </a>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
                <h1 style={{ color: t.text, fontSize: 18, fontWeight: 900, margin: 0 }}>#{c.id} · {c.insured}</h1>
                <StatusBadge status={c.status} />
              </div>
              <p style={{ color: t.textMuted, fontSize: 12, margin: "2px 0 0" }}>{c.dir} · {c.policy}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[{ l: tl?.claimAmount || "Da'vo", v: fmt(c.claim), col: t.text }, { l: tl?.returnedAmount || "Qaytarilgan", v: fmt(c.returned), col: t.success }, { l: tl?.remainingDebt || "Qoldiq", v: fmt(c.debt), col: c.debt===0 ? t.success : t.danger }].map(x => (
              <GlowCard key={x.l} theme={t} style={{ padding: "9px 14px", textAlign: "center", minWidth: 90 }}>
                <div style={{ color: t.textMuted, fontSize: 9, fontWeight: 700, textTransform: "uppercase", marginBottom: 3 }}>{x.l}</div>
                <div style={{ color: x.col, fontSize: 13, fontWeight: 900, fontFamily: t.font }}>{x.v}</div>
              </GlowCard>
            ))}
          </div>
        </div>

        {/* Progress */}
        <GlowCard theme={t} style={{ padding: "14px 18px", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 7 }}>
            <span style={{ color: t.text, fontWeight: 800, fontSize: 14 }}>Undirilish Progressi</span>
            <span style={{ color: pct===100 ? t.success : pct>50 ? t.warning : t.accent, fontSize: 20, fontWeight: 900, fontFamily: t.font }}>{pct}%</span>
          </div>
          <ProgressBar value={c.returned} max={c.claim} color={pct===100 ? t.success : t.accent} theme={t} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ color: t.textMuted, fontSize: 11 }}>0</span>
            <span style={{ color: t.textMuted, fontSize: 11 }}>{fmt(c.claim)} UZS</span>
          </div>
        </GlowCard>

        {/* Timeline */}
        <GlowCard theme={t} style={{ padding: "16px 18px", marginBottom: 12 }}>
          <div style={{ color: t.text, fontWeight: 800, fontSize: 14, marginBottom: 16 }}>Jarayon Bosqichlari</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, position: "relative" }}>
            <div style={{ position: "absolute", top: 21, left: "12.5%", right: "12.5%", height: 2, background: `linear-gradient(90deg, ${c.warn?t.success:t.border}, ${c.lawsuit?t.success:t.border}, ${c.court?t.success:t.border}, ${c.enf?t.success:t.border})`, zIndex: 0 }} />
            {steps.map((s, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}>
                <a href="#" onClick={e => e.preventDefault()} style={{ width: 42, height: 42, borderRadius: 13, background: s.done ? `${t.success}25` : t.surface3, border: `2px solid ${s.done ? t.success : t.border}`, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", marginBottom: 6, boxShadow: s.done ? `0 0 14px ${t.success}40` : "none" }}>
                  {s.done ? <CheckCircle size={19} color={t.success} strokeWidth={2} /> : <s.Icon size={19} color={t.textMuted} strokeWidth={2} />}
                </a>
                <div style={{ color: s.done ? t.success : t.textMuted, fontSize: 10, fontWeight: 700, textAlign: "center", marginBottom: 2 }}>{s.title}</div>
                {s.date ? (
                  <div style={{ textAlign: "center" }}>
                    {s.num != null && <div style={{ color: t.textMuted, fontSize: 9, fontFamily: t.font }}>№{s.num}</div>}
                    <div style={{ color: t.textSec, fontSize: 10 }}>{fmtDate(s.date)}</div>
                  </div>
                ) : <div style={{ color: t.textMuted, fontSize: 10 }}>—</div>}
              </div>
            ))}
          </div>
        </GlowCard>

        <Section title={tl?.contractInfo || "Contract Info"} SIcon={Shield} color={t.accent}>
          <F label={tl?.policyNumber || "Policy №"} value={c.policy} mono FIcon={CreditCard} />
          <F label={tl?.direction || "Direction"} value={c.dir} FIcon={Layers} />
          <F label={tl?.insured || "Insured"} value={c.insured} FIcon={Building2} />
          <F label={tl?.contractNumber || "Contract №"} value={c.contract_number} mono FIcon={Hash} />
          <F label={tl?.contractDate || "Contract Date"} value={fmtDate(c.contract_date)} FIcon={Calendar} />
          <F label={tl?.coverageStart || "Start"} value={fmtDate(c.coverage_start)} FIcon={Calendar} />
          <F label={tl?.coverageEnd || "End"} value={fmtDate(c.coverage_end)} FIcon={Calendar} />
          <F label={tl?.insuranceClass || "Class"} value={c.insurance_class} />
        </Section>

        <Section title={tl?.paymentInfo || "Payment Info"} SIcon={DollarSign} color={t.success}>
          <F label={tl?.incidentDate || "Incident"} value={fmtDate(c.incident)} FIcon={Calendar} />
          <F label={tl?.protocolNumber || "Protocol №"} value={c.protocol_number} mono />
          <F label={tl?.protocolDate || "Protocol Date"} value={fmtDate(c.protocol_date)} FIcon={Calendar} />
          <F label={tl?.paymentDate || "Payment Date"} value={fmtDate(c.payment_date)} FIcon={Calendar} />
          <F label={tl?.claimAmount || "Claim"} value={`${fmt(c.claim)} UZS`} color={t.danger} />
          <F label={tl?.returnedAmount || "Returned"} value={`${fmt(c.returned)} UZS`} color={t.success} />
          <F label={tl?.remainingDebt || "Remaining"} value={`${fmt(c.debt)} UZS`} color={c.debt===0 ? t.success : t.danger} />
          <F label={tl?.insuranceLiability || "Liability"} value={fmt(c.insurance_liability)} />
          <F label={tl?.insurancePremium || "Premium"} value={fmt(c.insurance_premium)} />
          <F label={tl?.postalExpense || "Postal"} value={fmt(c.postal_expense)} />
          <F label={tl?.penalty || "Penalty"} value={fmt(c.penalty)} />
        </Section>

        <Section title={tl?.debtorInfo || "Debtor Info"} SIcon={Users} color={t.warning}>
          <F label={tl?.fullName || "Full Name"} value={c.debtor} FIcon={Users} />
          <F label={tl?.pinfl || "PINFL"} value={c.pinfl} mono FIcon={Hash} />
          <F label={tl?.passport || "Passport"} value={c.passport} mono FIcon={CreditCard} />
          <F label={tl?.region || "Region"} value={c.region} FIcon={MapPin} />
          <F label={tl?.phone || "Phone"} value={c.phone} mono FIcon={Phone} />
          <F label={tl?.address || "Address"} value={c.address} span FIcon={MapPin} />
        </Section>

        {c.notes && (
          <div style={{ background: `${t.warning}12`, border: `1px solid ${t.warning}30`, borderRadius: 13, padding: "12px 16px", display: "flex", gap: 9, alignItems: "flex-start" }}>
            <Info size={16} color={t.warning} strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ color: t.warning, fontSize: 10, fontWeight: 800, marginBottom: 3, textTransform: "uppercase" }}>{tl?.notes || "Notes"}</div>
              <div style={{ color: t.text, fontSize: 13 }}>{c.notes}</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ─── NEW CASE FORM ────────────────────────────────────────────────────────────
  const NewCasePage = () => {
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ insured: "", dir: "", contract: "", policy: "", incident: "", claim: "", debtor: "", pinfl: "", passport: "", region: "", phone: "", address: "", postal: "", penalty: "" });
    const ch = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    const submit = async (e) => { e.preventDefault(); setSaving(true); await new Promise(r => setTimeout(r, 900)); setSaving(false); navigate("cases"); };
    const is = { width: "100%", background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 11, color: t.text, padding: "9px 13px", fontSize: 13, fontFamily: t.fontDisplay, outline: "none", boxSizing: "border-box" };
    const ls = { color: t.textMuted, fontSize: 9, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 5, letterSpacing: "0.1em" };

    const Sect = ({ title, SIcon, children }) => (
      <GlowCard theme={t} style={{ padding: 0, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "13px 16px", borderBottom: `1px solid ${t.border}` }}>
          {SIcon && <SIcon size={15} color={t.accent} strokeWidth={2} />}
          <span style={{ color: t.text, fontWeight: 800, fontSize: 14 }}>{title}</span>
        </div>
        <div style={{ padding: "13px 16px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 11 }}>{children}</div>
      </GlowCard>
    );

    const FF = ({ label, name, type = "text", req = false, options = null, span = false }) => (
      <div style={span ? { gridColumn: "1 / -1" } : {}}>
        <label style={ls}>{label}{req && <span style={{ color: t.danger }}> *</span>}</label>
        {options ? (
          <select name={name} value={form[name]} onChange={ch} style={is}>
            <option value="">—</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : (
          <input type={type} name={name} value={form[name]} onChange={ch} required={req} style={is} />
        )}
      </div>
    );

    return (
      <form onSubmit={submit} style={{ padding: "18px", fontFamily: t.fontDisplay }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="#" onClick={e => { e.preventDefault(); navigate("cases"); }} style={{ width: 36, height: 36, borderRadius: 11, border: `1px solid ${t.border}`, background: "transparent", color: t.textSec, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
              <ArrowLeft size={15} strokeWidth={2} />
            </a>
            <h1 style={{ color: t.text, fontSize: 20, fontWeight: 900, margin: 0 }}>✦ {tl?.addCase || "New Case"}</h1>
          </div>
          <button type="submit" disabled={saving} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 20px", borderRadius: 11, border: "none", background: saving ? t.textMuted : `linear-gradient(135deg, ${t.accent}, ${t.accent2})`, color: "#fff", cursor: saving ? "not-allowed" : "pointer", fontFamily: t.fontDisplay, fontSize: 13, fontWeight: 800, boxShadow: `0 8px 24px ${t.accent}40` }}>
            {saving ? <RefreshCw size={13} style={{ animation: "spin 1s linear infinite" }} /> : <CheckCircle size={13} />} {saving ? (tl?.loading || "Saving...") : (tl?.save || "Save")}
          </button>
        </div>
        <Sect title={tl?.contractInfo || "Contract"} SIcon={Shield}>
          <FF label={tl?.insured || "Insured"} name="insured" req />
          <FF label={tl?.direction || "Direction"} name="dir" req options={["Ucell","ЙТҲ","Асака","Давр","Агат","Микромолия 2","Микромолия 3"]} />
          <FF label={tl?.contractNumber || "Contract №"} name="contract" />
          <FF label={tl?.policyNumber || "Policy №"} name="policy" req />
          <FF label={tl?.coverageStart || "Coverage Start"} name="cstart" type="date" />
          <FF label={tl?.coverageEnd || "Coverage End"} name="cend" type="date" />
        </Sect>
        <Sect title={tl?.paymentInfo || "Payment"} SIcon={DollarSign}>
          <FF label={tl?.incidentDate || "Incident Date"} name="incident" type="date" req />
          <FF label={tl?.protocolNumber || "Protocol №"} name="pnum" type="number" />
          <FF label={tl?.protocolDate || "Protocol Date"} name="pdate" type="date" />
          <FF label={tl?.paymentDate || "Payment Date"} name="paydate" type="date" />
          <FF label={tl?.claimAmount || "Claim Amount (UZS)"} name="claim" type="number" req />
          <FF label={tl?.postalExpense || "Postal Expense"} name="postal" type="number" />
          <FF label={tl?.penalty || "Penalty"} name="penalty" type="number" />
        </Sect>
        <Sect title={tl?.debtorInfo || "Debtor"} SIcon={Users}>
          <FF label={tl?.fullName || "Full Name"} name="debtor" req />
          <FF label={tl?.pinfl || "PINFL (14 digits)"} name="pinfl" />
          <FF label={tl?.passport || "Passport"} name="passport" />
          <FF label={tl?.region || "Region"} name="region" />
          <FF label={tl?.phone || "Phone"} name="phone" type="tel" />
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={ls}>{tl?.address || "Address"}</label>
            <textarea name="address" value={form.address} onChange={ch} rows={2} style={{ ...is, resize: "none" }} />
          </div>
        </Sect>
      </form>
    );
  };

  // ─── LAYOUT ───────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
        @keyframes pulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:0.5; transform:scale(0.85); } }
        @keyframes fadeIn { from{ opacity:0; transform:translateY(8px); } to{ opacity:1; transform:translateY(0); } }
        @keyframes spin { from{ transform:rotate(0deg); } to{ transform:rotate(360deg); } }
        select option { background: #1a1a2e; color: #fff; }
        input[type=date]::-webkit-calendar-picker-indicator { filter:invert(0.7); cursor:pointer; }
        @media(max-width:768px){
          .desk-sidebar{ display:none!important; }
          .main-2col{ grid-template-columns:1fr!important; }
          .stat-cards{ grid-template-columns:repeat(2,1fr)!important; }
        }
        @media(max-width:480px){
          .stat-cards{ grid-template-columns:1fr!important; }
        }
      `}</style>

      <div style={{ display: "flex", height: "100dvh", overflow: "hidden", background: t.bg, fontFamily: t.fontDisplay, transition: "background 0.5s" }}>
        {/* Desktop sidebar */}
        <aside className="desk-sidebar" style={{ width: 210, flexShrink: 0, borderRight: `1px solid ${t.border}`, background: t.surface, display: "flex", flexDirection: "column" }}>
          <Sidebar />
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex" }}>
            <div style={{ flex: 1, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }} onClick={() => setSidebarOpen(false)} />
            <aside style={{ width: 250, background: t.surface, borderLeft: `1px solid ${t.border}`, display: "flex", flexDirection: "column", overflowY: "auto" }}>
              <Sidebar />
            </aside>
          </div>
        )}

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          {/* Topbar */}
          <header style={{ height: 54, flexShrink: 0, display: "flex", alignItems: "center", gap: 10, padding: "0 14px", borderBottom: `1px solid ${t.border}`, background: t.surface }}>
            <button onClick={() => setSidebarOpen(v => !v)} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 9, border: `1px solid ${t.border}`, background: "transparent", color: t.textSec, cursor: "pointer", flexShrink: 0 }}>
              <Menu size={15} strokeWidth={2} />
            </button>
            <a href="#" onClick={e => { e.preventDefault(); navigate("dashboard"); }} style={{ display: "flex", alignItems: "center", gap: 7, textDecoration: "none" }}>
              <Shield size={16} color={t.accent} strokeWidth={2} />
              <span style={{ color: t.text, fontWeight: 800, fontSize: 13 }}>SEMUR Regress</span>
            </a>
            <div style={{ flex: 1 }} />
            {/* Theme */}
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {Object.entries(THEMES).map(([key, th]) => (
                <button key={key} onClick={() => setThemeKey(key)} title={th.name} style={{ width: 19, height: 19, borderRadius: 5, border: `2px solid ${themeKey===key ? t.accent : "transparent"}`, background: th.bg, cursor: "pointer", transform: themeKey===key ? "scale(1.2)" : "scale(1)" }} />
              ))}
            </div>
            {/* Language */}
            <div style={{ display: "flex", gap: 3, alignItems: "center", padding: "0 8px", borderLeft: `1px solid ${t.border}`, borderRight: `1px solid ${t.border}` }}>
              <Globe size={12} color={t.textMuted} />
              {LOCALES.map(l => (
                <button key={l.code} onClick={() => setLocale(l.code)} style={{ fontSize: 10, padding: "3px 5px", borderRadius: 4, fontWeight: 600, border: locale===l.code ? `1px solid ${t.accent}` : "1px solid transparent", background: locale===l.code ? `${t.accent}15` : "transparent", color: locale===l.code ? t.accent : t.textMuted, cursor: "pointer" }}>
                  {l.label}
                </button>
              ))}
            </div>
            {/* Live */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 9px", borderRadius: 20, background: `${t.success}15`, border: `1px solid ${t.success}30`, color: t.success, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.success, animation: "pulse 2s infinite" }} /> Live
            </div>
          </header>

          {/* Content */}
          <main style={{ flex: 1, overflowY: "auto" }}>
            {page === "dashboard" && <DashboardPage />}
            {page === "cases" && <CasesListPage />}
            {page === "case-detail" && <CaseDetailPage />}
            {page === "new-case" && <NewCasePage />}
          </main>
        </div>
      </div>

      {statModal && <StatDetailModal type={statModal} theme={t} onClose={() => setStatModal(null)} tl={tl} />}
    </>
  );
}
