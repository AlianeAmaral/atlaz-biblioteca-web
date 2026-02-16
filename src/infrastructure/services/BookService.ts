import type { Book } from "../../domain/models/Book";

export class BookService {

  private readonly baseUrl = 'http://localhost:8081/books';

  // busca todos os livros do back-end, retorna um promise que faz um array de objetos do tipo "Book"
  async getAllBooks(): Promise<Book[]> {

    const response = await fetch(this.baseUrl);

    if (!response.ok) {
      throw new Error(`Erro ao buscar livros: ${response.statusText}`);
    }
    return await response.json();
  }
  // a seguir os métodos para criar, atualizar e deletar livros, seguindo a mesma estrutura do método getAllBooks
}
