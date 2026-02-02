import { useState } from 'react';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';
import BookList from './BookList';
import BookDetail from './BookDetail';
import { useBooks } from '../../hooks/useBooks.js';

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
          <CircularProgress size={40} sx={{ color: '#00bcd4' }} />
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
        <Alert severity="error" sx={{ bgcolor: '#111111', color: '#ffffff', border: '1px solid #00bcd4' }}>
          Error: {error.message}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      gap={2.5}
      maxWidth={1070}
      height="calc(100vh - 200px)"
      overflow="hidden"
      justifyContent="center"
      mx="auto"
      bgcolor="#000000"
    >
      {/* Left Panel - Book List */}
      <Box
        width={300}
        minWidth={300}
        bgcolor="#000000"
        border="2px solid #00bcd4"
        borderRadius={1}
        display="flex"
        flexDirection="column"
        sx={{ boxShadow: '0 0 20px rgba(0, 188, 212, 0.2)' }}
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
        width={750}
        minWidth={750}
        maxWidth={750}
        bgcolor="#000000"
        border="2px solid #00bcd4"
        borderRadius={1}
        overflow="auto"
        sx={{
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          boxShadow: '0 0 20px rgba(0, 188, 212, 0.2)'
        }}
      >
        <BookDetail book={selectedBook} onBookUpdate={handleBookUpdate} />
      </Box>
    </Box>
  );
};

export default BookHistorySection;