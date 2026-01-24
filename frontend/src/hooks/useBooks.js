import { useState, useEffect } from 'react';
import { BookTypes } from '../types/book.js';

export const useBooks = (page = 1, pageSize = 10) => {
  const [books, setBooks] = useState([]);
  const [pagination, setPagination] = useState(BookTypes.BooksByPageResponse.pagination);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooksByPage = async (currentPage = page, currentPageSize = pageSize) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/api/books?page=${currentPage}&pageSize=${currentPageSize}`);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data.books);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooksByPage(page, pageSize);
  }, [page, pageSize]);

  return {
    books,
    pagination,
    isLoading,
    error,
    refetch: fetchBooksByPage
  };
};