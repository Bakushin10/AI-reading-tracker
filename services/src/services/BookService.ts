import { Pool } from 'pg';
import { Book, BookRepository } from '../domain/index.js';

export class BookService {
  private db: Pool;
  private bookRepository: BookRepository;

  constructor(db: Pool, bookRepository: BookRepository) {
    this.db = db;
    this.bookRepository = bookRepository;
  }

  async createBook(book: Omit<Book, 'createdAt' | 'updatedAt'>): Promise<Book> {
    const client = await this.db.connect();
    try {
      await client.query('BEGIN');
      const result = await this.bookRepository.createBook(client, book);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async getBookById(bookUuid: string): Promise<Book | null> {
    const client = await this.db.connect();
    try {
      return await this.bookRepository.getBookById(client, bookUuid);
    } finally {
      client.release();
    }
  }

  async updateBook(book: Book): Promise<Book | null> {
    const client = await this.db.connect();
    try {
      await client.query('BEGIN');
      const result = await this.bookRepository.updateBook(client, book);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async deleteBook(bookUuid: string): Promise<boolean> {
    const client = await this.db.connect();
    try {
      await client.query('BEGIN');
      const result = await this.bookRepository.deleteBook(client, bookUuid);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async getAllBooks(): Promise<Book[]> {
    const client = await this.db.connect();
    try {
      return await this.bookRepository.getAllBooks(client);
    } finally {
      client.release();
    }
  }
}