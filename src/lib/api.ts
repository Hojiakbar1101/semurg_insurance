import type {
  RegressCase,
  RegressListResponse,
  SummaryStats,
  DirectionStats,
  MonthlyStats,
  ListFilters,
} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// ─── API Client ────────────────────────────────────────────────────────────────

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

function buildQuery(params: Record<string, unknown>): string {
  const p = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
  return p ? `?${p}` : "";
}

export const api = {
  list: (filters: ListFilters = {}): Promise<RegressListResponse> =>
    fetchAPI(`/regress/list${buildQuery(filters as Record<string, unknown>)}`),

  getOne: (id: number): Promise<RegressCase> =>
    fetchAPI(`/regress/${id}`),

  summary: (params?: { direction?: string; date_from?: string; date_to?: string }): Promise<SummaryStats> =>
    fetchAPI(`/regress/stats/summary${buildQuery(params || {})}`),

  byDirection: (): Promise<DirectionStats[]> =>
    fetchAPI("/regress/stats/by-direction"),

  monthly: (year: number, direction?: string): Promise<MonthlyStats> =>
    fetchAPI(`/regress/stats/monthly${buildQuery({ year, direction })}`),

  create: (data: Partial<RegressCase>): Promise<{ id: number; status: string }> =>
    fetchAPI("/regress", { method: "POST", body: JSON.stringify(data) }),

  updateStep: (
    id: number,
    data: { step: string; [key: string]: unknown }
  ): Promise<{ id: number; status: string; remaining_debt: number }> =>
    fetchAPI(`/regress/${id}/step`, { method: "PATCH", body: JSON.stringify(data) }),

  exportUrl: (filters: ListFilters = {}): string =>
    `${BASE_URL}/regress/export${buildQuery(filters as Record<string, unknown>)}`,
};

// ─── Mock Data (for development/demo) ─────────────────────────────────────────

export const MOCK_SUMMARY: SummaryStats = {
  total_cases: 1374,
  total_claim_amount: 9809081310,
  total_postal_expense: 1599400,
  total_penalty: 1002475,
  total_returned: 1304482320,
  total_remaining_debt: 8516692065,
  collection_rate_percent: 13.3,
  by_status: {
    NOT_REVIEWED: 952,
    SENT_TO_LAWYER: 35,
    IN_COLLECTION: 325,
    FULLY_COLLECTED: 62,
    ARCHIVED: 0,
  },
};

export const MOCK_BY_DIRECTION: DirectionStats[] = [
  {
    direction: "Асака",
    total_cases: 755,
    total_claim_amount: 5200000000,
    total_returned: 800000000,
    remaining_debt: 4400000000,
    status: {
      pre_court: { count: 140, amount: 1200000000 },
      court: { count: 80, amount: 950000000 },
      enforcement: { count: 60, amount: 820000000 },
    },
  },
  {
    direction: "Давр",
    total_cases: 486,
    total_claim_amount: 2900000000,
    total_returned: 350000000,
    remaining_debt: 2550000000,
    status: {
      pre_court: { count: 90, amount: 800000000 },
      court: { count: 45, amount: 600000000 },
      enforcement: { count: 30, amount: 400000000 },
    },
  },
  {
    direction: "Агат",
    total_cases: 75,
    total_claim_amount: 980000000,
    total_returned: 95000000,
    remaining_debt: 885000000,
    status: {
      pre_court: { count: 20, amount: 300000000 },
      court: { count: 10, amount: 200000000 },
      enforcement: { count: 8, amount: 150000000 },
    },
  },
  {
    direction: "ЙТҲ",
    total_cases: 26,
    total_claim_amount: 420000000,
    total_returned: 40000000,
    remaining_debt: 380000000,
    status: {
      pre_court: { count: 8, amount: 120000000 },
      court: { count: 4, amount: 80000000 },
      enforcement: { count: 2, amount: 50000000 },
    },
  },
  {
    direction: "Ucell",
    total_cases: 18,
    total_claim_amount: 180000000,
    total_returned: 15000000,
    remaining_debt: 165000000,
    status: {
      pre_court: { count: 6, amount: 60000000 },
      court: { count: 3, amount: 40000000 },
      enforcement: { count: 2, amount: 30000000 },
    },
  },
  {
    direction: "Микромолия 2",
    total_cases: 12,
    total_claim_amount: 85000000,
    total_returned: 3000000,
    remaining_debt: 82000000,
    status: {
      pre_court: { count: 4, amount: 30000000 },
      court: { count: 2, amount: 20000000 },
      enforcement: { count: 1, amount: 15000000 },
    },
  },
  {
    direction: "Микромолия 3",
    total_cases: 2,
    total_claim_amount: 44081310,
    total_returned: 1482320,
    remaining_debt: 42598990,
    status: {
      pre_court: { count: 1, amount: 20000000 },
      court: { count: 1, amount: 15000000 },
      enforcement: { count: 0, amount: 0 },
    },
  },
];

export const MOCK_MONTHLY: MonthlyStats = {
  year: 2025,
  months: [
    { month: 1, label: "Yanvar", new_cases: 45, total_amount: 820000000 },
    { month: 2, label: "Fevral", new_cases: 62, total_amount: 1050000000 },
    { month: 3, label: "Mart", new_cases: 78, total_amount: 1300000000 },
    { month: 4, label: "Aprel", new_cases: 95, total_amount: 1650000000 },
    { month: 5, label: "May", new_cases: 110, total_amount: 1900000000 },
    { month: 6, label: "Iyun", new_cases: 88, total_amount: 1520000000 },
    { month: 7, label: "Iyul", new_cases: 102, total_amount: 1780000000 },
    { month: 8, label: "Avgust", new_cases: 125, total_amount: 2150000000 },
    { month: 9, label: "Sentabr", new_cases: 98, total_amount: 1680000000 },
    { month: 10, label: "Oktabr", new_cases: 135, total_amount: 2400000000 },
    { month: 11, label: "Noyabr", new_cases: 115, total_amount: 2100000000 },
    { month: 12, label: "Dekabr", new_cases: 88, total_amount: 1600000000 },
  ],
};

export const MOCK_CASES: RegressCase[] = [
  {
    id: 1,
    status: "SENT_TO_LAWYER",
    insured: "AGAT CREDIT AJ MFO",
    direction: "Агат",
    contract_number: "02-58-254266",
    contract_date: null,
    insurance_liability: null,
    insurance_premium: null,
    policy_series: "ESID",
    policy_number: "ESID 0022282",
    coverage_start: null,
    coverage_end: null,
    insurance_class: null,
    incident_date: "2025-11-28",
    protocol_number: 295,
    protocol_date: "2025-11-28",
    payment_date: "2025-11-28",
    claim_amount: 24909265.39,
    postal_expense: 0,
    penalty: 0,
    returned_amount: 0,
    remaining_debt: 24909265.39,
    debtor: {
      full_name: "Abdullayeva Ra'noxon Sobirjon qizi",
      pinfl: "42003954340031",
      passport: "AA 9646836",
      region: "Farg'ona viloyati",
      address: "Farg'ona viloyati Marg'ilon shahri Beshbola MFY Charxi 22",
      phone: null,
    },
    process: {
      warning_letter_number: 4133,
      warning_letter_date: "2025-11-28",
      warning_amount: null,
      lawsuit_number: null,
      lawsuit_date: null,
      lawsuit_status: null,
      court_case_number: null,
      court_date: null,
      court_amount: null,
      enforcement_number: null,
      enforcement_date: null,
      enforcement_amount: null,
      enforcement_officer: null,
      enforcement_phone: null,
    },
    notes: "sud qarori yoq",
  },
  {
    id: 2,
    status: "IN_COLLECTION",
    insured: "ASAKA BANK",
    direction: "Асака",
    contract_number: "01-45-183921",
    contract_date: "2024-01-15",
    insurance_liability: 50000000,
    insurance_premium: 500000,
    policy_series: "ESID",
    policy_number: "ESID 0099999",
    coverage_start: "2024-01-15",
    coverage_end: "2025-01-15",
    insurance_class: "A",
    incident_date: "2025-06-10",
    protocol_number: 123,
    protocol_date: "2025-06-10",
    payment_date: "2025-06-15",
    claim_amount: 8500000,
    postal_expense: 25000,
    penalty: 150000,
    returned_amount: 2000000,
    remaining_debt: 6500000,
    debtor: {
      full_name: "Karimov Ali Vali ogli",
      pinfl: "12345678901234",
      passport: "AB 1234567",
      region: "Toshkent shahri",
      address: "Chilonzor t., Yangi hayot 12",
      phone: "+998901234567",
    },
    process: {
      warning_letter_number: 4200,
      warning_letter_date: "2025-06-20",
      warning_amount: 8500000,
      lawsuit_number: "2-5431/25",
      lawsuit_date: "2025-08-15",
      lawsuit_status: "active",
      court_case_number: null,
      court_date: null,
      court_amount: null,
      enforcement_number: null,
      enforcement_date: null,
      enforcement_amount: null,
      enforcement_officer: null,
      enforcement_phone: null,
    },
    notes: null,
  },
  {
    id: 3,
    status: "FULLY_COLLECTED",
    insured: "DAVR BANK",
    direction: "Давр",
    contract_number: "03-22-091234",
    contract_date: "2023-08-20",
    insurance_liability: 30000000,
    insurance_premium: 300000,
    policy_series: "DSIA",
    policy_number: "DSIA 0055432",
    coverage_start: "2023-08-20",
    coverage_end: "2024-08-20",
    insurance_class: "B",
    incident_date: "2024-05-01",
    protocol_number: 89,
    protocol_date: "2024-05-01",
    payment_date: "2024-05-10",
    claim_amount: 15000000,
    postal_expense: 50000,
    penalty: 200000,
    returned_amount: 15000000,
    remaining_debt: 0,
    debtor: {
      full_name: "Toshmatov Bobur Hamid o'g'li",
      pinfl: "98765432109876",
      passport: "BB 7654321",
      region: "Samarqand viloyati",
      address: "Samarqand sh., Mirzo Ulug'bek ko'chasi 45",
      phone: "+998712345678",
    },
    process: {
      warning_letter_number: 3890,
      warning_letter_date: "2024-05-15",
      warning_amount: 15000000,
      lawsuit_number: "2-1234/24",
      lawsuit_date: "2024-07-01",
      lawsuit_status: "resolved",
      court_case_number: "SH-2024-1234",
      court_date: "2024-09-15",
      court_amount: 15000000,
      enforcement_number: "MIB-2024-567",
      enforcement_date: "2024-10-01",
      enforcement_amount: 15000000,
      enforcement_officer: "Yusupov Sherzod",
      enforcement_phone: "+998935678901",
    },
    notes: "To'liq undirildi",
  },
  {
    id: 4,
    status: "NOT_REVIEWED",
    insured: "UCELL TELECOM",
    direction: "Ucell",
    contract_number: "04-11-556677",
    contract_date: "2025-01-05",
    insurance_liability: 20000000,
    insurance_premium: 200000,
    policy_series: "UCID",
    policy_number: "UCID 0011223",
    coverage_start: "2025-01-05",
    coverage_end: "2026-01-05",
    insurance_class: null,
    incident_date: "2025-10-15",
    protocol_number: 412,
    protocol_date: "2025-10-15",
    payment_date: "2025-10-20",
    claim_amount: 5500000,
    postal_expense: 0,
    penalty: 0,
    returned_amount: 0,
    remaining_debt: 5500000,
    debtor: {
      full_name: "Nazarov Jasur Alisher o'g'li",
      pinfl: "55544433322211",
      passport: "CC 3344556",
      region: "Toshkent viloyati",
      address: "Angren shahri, Amir Temur ko'chasi 8",
      phone: "+998944455667",
    },
    process: {
      warning_letter_number: null,
      warning_letter_date: null,
      warning_amount: null,
      lawsuit_number: null,
      lawsuit_date: null,
      lawsuit_status: null,
      court_case_number: null,
      court_date: null,
      court_amount: null,
      enforcement_number: null,
      enforcement_date: null,
      enforcement_amount: null,
      enforcement_officer: null,
      enforcement_phone: null,
    },
    notes: null,
  },
  {
    id: 5,
    status: "ARCHIVED",
    insured: "MIKROMOLIYA 2",
    direction: "Микромолия 2",
    contract_number: "05-33-778899",
    contract_date: "2021-03-10",
    insurance_liability: 10000000,
    insurance_premium: 100000,
    policy_series: "MKID",
    policy_number: "MKID 0077665",
    coverage_start: "2021-03-10",
    coverage_end: "2022-03-10",
    insurance_class: "C",
    incident_date: "2021-11-20",
    protocol_number: 55,
    protocol_date: "2021-11-20",
    payment_date: "2021-11-25",
    claim_amount: 3200000,
    postal_expense: 30000,
    penalty: 50000,
    returned_amount: 1500000,
    remaining_debt: 1700000,
    debtor: {
      full_name: "Holiqova Malika Toxir qizi",
      pinfl: "33322211100099",
      passport: "DD 1122334",
      region: "Namangan viloyati",
      address: "Namangan sh., Uychi ko'chasi 17",
      phone: null,
    },
    process: {
      warning_letter_number: 2100,
      warning_letter_date: "2021-12-01",
      warning_amount: 3200000,
      lawsuit_number: "2-890/22",
      lawsuit_date: "2022-02-15",
      lawsuit_status: "closed",
      court_case_number: "SH-2022-890",
      court_date: "2022-05-10",
      court_amount: 3200000,
      enforcement_number: "MIB-2022-234",
      enforcement_date: "2022-06-01",
      enforcement_amount: 1500000,
      enforcement_officer: "Rahimov Akbar",
      enforcement_phone: "+998712223344",
    },
    notes: "Arxivlangan - 36 oydan ortiq",
  },
];
