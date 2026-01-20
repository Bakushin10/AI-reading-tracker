import { PoolClient } from 'pg';

export interface Book {
  bookUuid: string;
  title: string;
  link?: string;
  date: string;
  memo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookRepository {
  createBook(client: PoolClient, book: Omit<Book, 'createdAt' | 'updatedAt'>): Promise<Book>;
  getBookById(client: PoolClient, bookUuid: string): Promise<Book | null>;
  updateBook(client: PoolClient, bookUuid: string, updates: Partial<Pick<Book, 'title' | 'link' | 'date' | 'memo'>>): Promise<Book | null>;
  deleteBook(client: PoolClient, bookUuid: string): Promise<boolean>;
  getAllBooks(client: PoolClient): Promise<Book[]>;
}