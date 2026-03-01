import { useState } from 'react';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';
import BookList from './BookList';
import BookDetail from './BookDetail';
import { useBooks } from '../../hooks/useBooks.js';

const styles = `
  .book-history-loading-spinner {
    color: #00bcd4;
  }

  .book-history-error-alert {
    background-color: #111111 !important;
    color: #ffffff !important;
    border: 1px solid #00bcd4 !important;
  }

  .book-history-panel {
    box-shadow: 0 0 20px rgba(0, 188, 212, 0.2);
  }

  .book-history-detail-panel {
    word-wrap: break-word;
    overflow-wrap: break-word;
    box-shadow: 0 0 20px rgba(0, 188, 212, 0.2);
  }
`;

const BookHistorySection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { books, pagination, isLoading, error, refetch } = useBooks(currentPage, 10);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const handleBookUpdate = (updatedBook) => {
    setSelectedBook(updatedBook);
    refetch();
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="400px"
        bgcolor="#000000"
      >
        <Box textAlign="center">
          <CircularProgress size={40} className="book-history-loading-spinner" />
          <Typography variant="h6" color="#ffffff" mt={2}>
            Loading entries...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} bgcolor="#000000">
        <Alert severity="error" className="book-history-error-alert">
          Error: {error.message}
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <Box
        display="flex"
        width="100%"
        maxWidth={{ xs: '100vw', md: 1200 }}
        height="calc(100vh - var(--header-total-height, 170px))"
        overflow="hidden"
        justifyContent="center"
        mx="auto"
        bgcolor="#000000"
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          padding: { xs: '8px', sm: '16px', md: '0' },
          gap: { xs: 1, sm: 1.5, md: 2.5 },
          boxSizing: 'border-box'
        }}
      >
      {/* Left Panel - Book List */}
      <Box
        width={{ xs: '100%', sm: '100%', md: '350px' }}
        maxWidth={{ xs: '100%', md: '350px' }}
        minWidth={{ xs: '0', md: '300px' }}
        height={{ xs: '300px', md: 'auto' }}
        bgcolor="#000000"
        border="2px solid #00bcd4"
        borderRadius={1}
        display="flex"
        flexDirection="column"
        className="book-history-panel"
        sx={{ flexShrink: { md: 0 } }}
      >
        <BookList
          entries={books}
          onBookSelect={handleBookSelect}
          selectedBook={selectedBook}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </Box>

      {/* Right Panel - Book Detail */}
      <Box
        width={{ xs: '100%', md: 'auto' }}
        minWidth={{ xs: '0', md: '400px' }}
        maxWidth={{ xs: '100%', md: 'none' }}
        flex={{ xs: 1, md: 1 }}
        bgcolor="#000000"
        border="2px solid #00bcd4"
        borderRadius={1}
        overflow="auto"
        className="book-history-detail-panel"
        sx={{ flexShrink: 1 }}
      >
        <BookDetail book={selectedBook} onBookUpdate={handleBookUpdate} />
      </Box>
    </Box>
    </>
  );
};

export default BookHistorySection;