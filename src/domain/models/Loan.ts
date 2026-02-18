import type { LoanStatus } from "./LoanStatus";

export interface Loan {
  id: number;
  registration: string;
  bookCode: number;
  startDate: Date;
  endDate: Date;
  loanStatus: LoanStatus
}
