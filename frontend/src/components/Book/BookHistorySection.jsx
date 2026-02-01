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
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <Box textAlign="center">
          <CircularProgress size={40} />
          <Typography variant="h6" color="#666" mt={2}>
            Loading entries...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert severity="error">
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
    >
      {/* Left Panel - Book List */}
      <Box
        width={300}
        minWidth={300}
        bgcolor="white"
        border="2px solid black"
        borderRadius={1}
        display="flex"
        flexDirection="column"
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
        bgcolor="#fafafa"
        border="2px solid black"
        borderRadius={1}
        overflow="auto"
        sx={{
          wordWrap: 'break-word',
          overflowWrap: 'break-word'
        }}
      >
        <BookDetail book={selectedBook} onBookUpdate={handleBookUpdate} />
      </Box>
    </Box>
  );
};

export default BookHistorySection;