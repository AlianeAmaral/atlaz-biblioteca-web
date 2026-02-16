import type { BookStatus } from "./BookStatus";

export interface Book {
  id: number;
  bookCode: number;
  title: string;
  author: string;
  genre: string;
  imageId: string;
  bookStatus: BookStatus
}
