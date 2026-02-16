import type { LoanStatus } from "./LoanStatus";

export interface Loan {
  registration: string;
  bookCode: number;
  startDate: Date;
  endDate: Date;
  loanStatus: LoanStatus
}
