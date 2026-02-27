export type RegressStatus =
  | "NOT_REVIEWED"
  | "SENT_TO_LAWYER"
  | "IN_COLLECTION"
  | "FULLY_COLLECTED"
  | "ARCHIVED";

export type Direction =
  | "Ucell"
  | "ЙТҲ"
  | "Асака"
  | "Давр"
  | "Агат"
  | "Микромолия 2"
  | "Микромолия 3";

export interface Debtor {
  full_name: string;
  pinfl: string;
  passport: string;
  region: string;
  address: string;
  phone: string | null;
}

export interface Process {
  warning_letter_number: number | null;
  warning_letter_date: string | null;
  warning_amount: number | null;
  lawsuit_number: string | null;
  lawsuit_date: string | null;
  lawsuit_status: string | null;
  court_case_number: string | null;
  court_date: string | null;
  court_amount: number | null;
  enforcement_number: string | null;
  enforcement_date: string | null;
  enforcement_amount: number | null;
  enforcement_officer: string | null;
  enforcement_phone: string | null;
}

export interface RegressCase {
  id: number;
  status: RegressStatus;
  insured: string;
  direction: Direction;
  contract_number: string;
  contract_date: string | null;
  insurance_liability: number | null;
  insurance_premium: number | null;
  policy_series: string;
  policy_number: string;
  coverage_start: string | null;
  coverage_end: string | null;
  insurance_class: string | null;
  incident_date: string;
  protocol_number: number;
  protocol_date: string;
  payment_date: string;
  claim_amount: number;
  postal_expense: number;
  penalty: number;
  returned_amount: number;
  remaining_debt: number;
  debtor: Debtor;
  process: Process;
  notes: string | null;
}

export interface RegressListResponse {
  total: number;
  page: number;
  data: RegressCase[];
}

export interface SummaryStats {
  total_cases: number;
  total_claim_amount: number;
  total_postal_expense: number;
  total_penalty: number;
  total_returned: number;
  total_remaining_debt: number;
  collection_rate_percent: number;
  by_status: Record<RegressStatus, number>;
}

export interface DirectionStats {
  direction: string;
  total_cases: number;
  total_claim_amount: number;
  total_returned: number;
  remaining_debt: number;
  status: {
    pre_court: { count: number; amount: number };
    court: { count: number; amount: number };
    enforcement: { count: number; amount: number };
  };
}

export interface MonthlyStats {
  year: number;
  months: {
    month: number;
    label: string;
    new_cases: number;
    total_amount: number;
  }[];
}

export interface ListFilters {
  status?: RegressStatus;
  direction?: Direction;
  search?: string;
  date_from?: string;
  date_to?: string;
  page?: number;
  limit?: number;
  sort?: "remaining_debt" | "incident_date" | "claim_amount";
  sort_dir?: "asc" | "desc";
}
