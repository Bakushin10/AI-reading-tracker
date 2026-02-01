import { Request, Response } from 'express';
import { BookService } from '../services/index.js';
import { BookQueryService, type PaginatedBooksResponse } from '../queryServices/index.js';

export interface CreateBookRequest {
  bookUuid: string;
  title: string;
  link?: string;
  date: string;
  memo: string;
}

export interface UpdateBookRequest {
  title?: string;
  link?: string;
  date?: string;
  memo?: string;
}

export interface BookResponse {
  bookUuid: string;
  title: string;
  link?: string;
  date: string;
  memo: string;
  createdAt: Date;
  updatedAt: Date;
}

export class BookController {
  private bookService: BookService;
  private bookQueryService: BookQueryService;

  constructor(bookService: BookService, bookQueryService: BookQueryService) {
    this.bookService = bookService;
    this.bookQueryService = bookQueryService;
  }

  createBook = async (req: Request<{}, BookResponse, CreateBookRequest>, res: Response): Promise<void> => {
    try {
      const book = await this.bookService.createBook({
        bookUuid: req.body.bookUuid,
        title: req.body.title,
        link: req.body.link,
        date: req.body.date,
        memo: req.body.memo
      });

      res.status(201).json(book);
    } catch (error) {
      console.error('Error creating book:', error);
      res.status(500).json({ message: 'Failed to create book' });
    }
  };

  getBookById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const book = await this.bookService.getBookById(req.params.id);

      if (!book) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }

      res.status(200).json(book);
    } catch (error) {
      console.error('Error fetching book:', error);
      res.status(500).json({ message: 'Failed to fetch book' });
    }
  };

  getBooksByPage = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;

      const result = await this.bookQueryService.getBooksWithPagination({ page, pageSize });
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Failed to fetch books' });
    }
  };

  updateBook = async (req: Request<{ id: string }, BookResponse, UpdateBookRequest>, res: Response): Promise<void> => {
    try {
      const existingBook = await this.bookService.getBookById(req.params.id);

      if (!existingBook) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }

      const updatedBook = {
        ...existingBook,
        ...req.body
      };

      const book = await this.bookService.updateBook(updatedBook);

      if (!book) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }

      res.status(200).json(book);
    } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ message: 'Failed to update book' });
    }
  };

  deleteBook = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const success = await this.bookService.deleteBook(req.params.id);

      if (!success) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ message: 'Failed to delete book' });
    }
  };
}