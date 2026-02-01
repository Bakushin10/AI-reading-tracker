import { PoolClient } from 'pg';
import { Book, BookRepository } from '../domain/index.js';

interface BookRow {
  book_uuid: string;
  title: string;
  link: string | null;
  date: string;
  memo: string;
  created_at: Date;
  updated_at: Date;
}

export class PostgresBookRepository implements BookRepository {

  async createBook(client: PoolClient, book: Omit<Book, 'createdAt' | 'updatedAt'>): Promise<Book> {
    const now = new Date();

    const query = `
      INSERT INTO books (book_uuid, title, link, date, memo, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING book_uuid, title, link, date, memo, created_at, updated_at
    `;

    const result = await client.query<BookRow>(query, [
      book.bookUuid,
      book.title,
      book.link || null,
      book.date,
      book.memo,
      now,
      now
    ]);

    return this.mapRowToBook(result.rows[0]);
  }

  async getBookById(client: PoolClient, bookUuid: string): Promise<Book | null> {
    const query = `
      SELECT book_uuid, title, link, date, memo, created_at, updated_at
      FROM books
      WHERE book_uuid = $1
    `;

    const result = await client.query<BookRow>(query, [bookUuid]);
    return result.rows[0] ? this.mapRowToBook(result.rows[0]) : null;
  }

  async updateBook(client: PoolClient, book: Book): Promise<Book | null> {
    const now = new Date();

    const query = `
      UPDATE books
      SET title = $2, link = $3, date = $4, memo = $5, updated_at = $6
      WHERE book_uuid = $1
      RETURNING book_uuid, title, link, date, memo, created_at, updated_at
    `;

    const result = await client.query<BookRow>(query, [
      book.bookUuid,
      book.title,
      book.link || null,
      book.date,
      book.memo,
      now
    ]);

    return result.rows[0] ? this.mapRowToBook(result.rows[0]) : null;
  }

  async deleteBook(client: PoolClient, bookUuid: string): Promise<boolean> {
    const query = `
      DELETE FROM books
      WHERE book_uuid = $1
    `;

    const result = await client.query(query, [bookUuid]);
    return (result.rowCount ?? 0) > 0;
  }

  async getAllBooks(client: PoolClient): Promise<Book[]> {
    const query = `
      SELECT book_uuid, title, link, date, memo, created_at, updated_at
      FROM books
      ORDER BY created_at DESC
    `;

    const result = await client.query<BookRow>(query);
    return result.rows.map(row => this.mapRowToBook(row));
  }

  private mapRowToBook(row: BookRow): Book {
    return {
      bookUuid: row.book_uuid,
      title: row.title,
      link: row.link || undefined,
      date: row.date,
      memo: row.memo,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}