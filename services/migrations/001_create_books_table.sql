-- Migration: 001_create_books_table
-- Description: Create the books table for storing reading tracker entries

CREATE TABLE IF NOT EXISTS books (
  book_uuid VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  link TEXT,
  date VARCHAR(10) NOT NULL,
  memo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on created_at for efficient ordering
CREATE INDEX IF NOT EXISTS idx_books_created_at ON books(created_at DESC);

-- Create an index on title for searching
CREATE INDEX IF NOT EXISTS idx_books_title ON books(title);