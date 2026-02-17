import type { Book } from "../../domain/models/Book";

export class BookService {

  private readonly baseUrl = 'http://localhost:8081/books';

  async getAllBooks(): Promise<Book[]> {

    const response = await fetch(this.baseUrl);

    if (!response.ok) {
      throw new Error(`Erro ao buscar livros: ${response.statusText}`);
    }
    return await response.json();
  }



}
