import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import { HealthController, BookController } from './controllers/index.js';
import { HealthCheckService, BookService } from './services/index.js';
import { BookQueryService } from './queryServices/index.js';
import { PostgresBookRepository } from './infrastructure/index.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Database connection
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
  max: 5,
});

db.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

app.use(cors());
app.use(express.json());

// Dependency injection
const healthController = new HealthController();
const bookRepository = new PostgresBookRepository();
const bookService = new BookService(db, bookRepository);
const bookQueryService = new BookQueryService(db);
const bookController = new BookController(bookService, bookQueryService);

// Routes
app.get('/ping', healthController.ping);

// Book routes
app.post('/api/books', bookController.createBook);
app.get('/api/books', bookController.getBooksByPage);
app.get('/api/books/:id', bookController.getBookById);
app.put('/api/books/:id', bookController.updateBook);
app.delete('/api/books/:id', bookController.deleteBook);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});