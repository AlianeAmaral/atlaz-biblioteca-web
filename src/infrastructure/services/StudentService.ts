import type { Student } from "@/domain/models/Student";

export class StudentService {

    private readonly baseUrl = 'http://localhost:8081/students';

    // retorna todos os alunos do back-end, retorna um promise que faz um array de objetos do tipo "Student"
    async getAllStudents(): Promise<Student[]> {

        const response = await fetch(this.baseUrl);

        if (!response.ok) {
            throw new Error(`Erro ao buscar alunos: ${response.statusText}`);
        }
        return await response.json();
    }

    // a seguir os métodos para criar, atualizar e deletar livros, seguindo a mesma estrutura do método getAllStudents

    // busca o aluno por ID (para a tela de detalhes)
    async getStudentById(id: string): Promise<Student> {
        const response = await fetch(`${this.baseUrl}/${id}`);

        if (!response.ok) {
            throw new Error(`Erro ao buscar detalhes do aluno: ${response.statusText}`);
        }
        return await response.json();
    }

    // cria um novo aluno
    async createStudent(student: Student): Promise<Student> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar aluno');
        }
        return await response.json();
    }
}