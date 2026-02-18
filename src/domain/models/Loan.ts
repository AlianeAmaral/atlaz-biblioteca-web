import type { LoanStatus } from "./LoanStatus";

export interface Loan {
  id: number;
  registration: string;
  bookCode: number;
  startDate: string;
  endDate: string;
  loanStatus: LoanStatus
}
