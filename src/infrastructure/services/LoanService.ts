import type { Loan } from "@/domain/models/Loan";

export class LoanService {

    private readonly baseUrl = 'http://localhost:8081/loans';

    async getAllLoans(): Promise<Loan[]> {

        const response = await fetch(this.baseUrl);

        if (!response.ok) {
            throw new Error(`Erro ao buscar empréstimos: ${response.statusText}`);
        }
        return await response.json();
    }
}