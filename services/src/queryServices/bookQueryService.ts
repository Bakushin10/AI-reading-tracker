import { Pool, PoolClient } from 'pg';
import { Book } from '../domain/index.js';

export interface PaginatedBooksResponse {
  books: Book[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
  };
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

const BOOKS_PAGINATED_QUERY = `
  SELECT
    book_uuid,
    title,
    link,
    date,
    memo,
    created_at,
    updated_at
  FROM books
  ORDER BY created_at DESC
  LIMIT $1 OFFSET $2
`;

export class BookQueryService {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  async getBooksWithPagination(params: PaginationParams = {}): Promise<PaginatedBooksResponse> {
    const client = await this.db.connect();
    try {
      const page = Math.max(1, params.page || 1);
      const pageSize = Math.min(50, Math.max(1, params.pageSize || 10)); // Default 10, max 50
      const offset = (page - 1) * pageSize;

      // Get total count
      const countQuery = 'SELECT COUNT(*) as total FROM books';
      const countResult = await client.query(countQuery);
      const totalCount = parseInt(countResult.rows[0].total);
      const totalPages = Math.ceil(totalCount / pageSize);

      // Get paginated books ordered by created_at (newest first)
      const booksResult = await client.query(BOOKS_PAGINATED_QUERY, [pageSize, offset]);

      const books: Book[] = booksResult.rows.map(row => ({
        bookUuid: row.book_uuid,
        title: row.title,
        link: row.link,
        date: row.date,
        memo: row.memo,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }));

      return {
        books,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          pageSize
        }
      };
    } finally {
      client.release();
    }
  }
}