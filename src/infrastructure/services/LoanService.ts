import type { Loan } from "@/domain/models/Loan";

export class LoanService {

    private readonly baseUrl = 'http://localhost:8081/loans';

    // retorna um promise que faz um array de objetos do tipo "Loan" originados da API
    async getAllLoans(): Promise<Loan[]> {
        const response = await fetch(this.baseUrl);

        if (!response.ok) {
            throw new Error(`Erro ao buscar o histórico de empréstimo: ${response.statusText}`);
        }
        return await response.json();
    }

    // busca o empréstimo por ID
    async getLoanById(id: number): Promise<Loan> {
        const response = await fetch(`${this.baseUrl}/${id}`);

        if (!response.ok) {
            throw new Error(`Erro ao buscar histórico de empréstimos por ID: ${response.statusText}`);
        }
        return await response.json();
    }

    // cadastra um novo empréstimo
    async createLoan(loan: Omit<Loan, 'id'>): Promise<Loan> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loan)
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar empréstimo');
        }
        return await response.json();
    }

    // edita um empréstimo já existente
    async updateLoan(id: number, loan: Partial<Loan>): Promise<Loan> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH', 
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(loan)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Erro ${response.status}: Falha ao atualizar empréstimo`);
        }

        return await response.json();
    }
}