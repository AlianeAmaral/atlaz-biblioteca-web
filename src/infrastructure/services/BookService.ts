import type { Book } from "@/domain/models/Book";

export class BookService {

    private readonly baseUrl = 'http://localhost:8081/books';

    // retorna um promise que faz um array de objetos do tipo "Book" originados da API
    async getAllBooks(): Promise<Book[]> {

        const response = await fetch(this.baseUrl);

        if (!response.ok) {
            throw new Error(`Erro ao buscar livros: ${response.statusText}`);
        }
        return await response.json();
    }

    // busca o livro por ID (para a tela de detalhes)
    async getBookById(id: number): Promise<Book> {
        const response = await fetch(`${this.baseUrl}/${id}`);

        if (!response.ok) {
            throw new Error(`Erro ao buscar detalhes do livro: ${response.statusText}`);
        }
        return await response.json();
    }

    // cadastra um novo livro
    async createBook(book: Omit<Book, 'id'>): Promise<Book> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar livro');
        }
        return await response.json();
    }

    // edita um livro já existente
    async updateBook(id: number, book: Partial<Book>): Promise<Book> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH', 
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(book)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Erro ${response.status}: Falha ao atualizar livro`);
        }

        return await response.json();
    }

    // processa upload de capas dos livros
    async uploadFile(fileName: string, base64Data: string): Promise<string> {
    const response = await fetch('http://localhost:8081/images/upload', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        
        body: JSON.stringify({
            fileName: fileName,
            base64Data: base64Data
        })
    });

        if (!response.ok) {
            throw new Error('Erro ao fazer upload do arquivo');
        }

        return await response.text();
    }
}