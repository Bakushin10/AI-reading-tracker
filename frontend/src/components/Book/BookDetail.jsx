import React from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { Formik, Form } from 'formik';

const BookDetail = ({ book, onBookUpdate }) => {
  const initialValues = {
    title: book?.title || '',
    memo: book?.memo || ''
  };

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(`http://localhost:8080/api/books/${book.bookUuid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      const result = await response.json();
      onBookUpdate(result);
    } catch (err) {
      console.error('Error updating book:', err);
    }
  };

  if (!book) {
    return (
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box textAlign="center">
          <Typography variant="h4" fontWeight={700} color="#333" mb={2}>
            Select a book
          </Typography>
          <Typography variant="h6" color="#666">
            Choose a book from the list to view details
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box px={4} pb={4} pt={1} flex={1} overflow="auto">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, handleChange, dirty, handleSubmit }) => (
            <Form>
              {/* Title Input */}
              <Box mb={2}>
                <TextField
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  placeholder="Book title..."
                  variant="outlined"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '12px',
                      fontWeight: 700,
                      '& input': {
                        padding: '12px',
                      }
                    }
                  }}
                />
              </Box>

              {/* Date and Link Row */}
              <Box display="flex" gap={1} alignItems="center" mb={1}>
                {book.link && (
                  <Link
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={book.link}
                    sx={{
                      fontSize: '18px',
                      textDecoration: 'none',
                      '&:hover': { transform: 'scale(1.1)' }
                    }}
                  >
                    🔗
                  </Link>
                )}
                <Typography variant="body2" color="#333" fontWeight={500}>
                  {new Date(book.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Typography>
              </Box>

              {/* Notes Section */}
              <Box mb={1}>
                <TextField
                  name="memo"
                  value={values.memo}
                  onChange={handleChange}
                  placeholder="Your thoughts on this reading..."
                  multiline
                  rows={6}
                  variant="outlined"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#fafafa',
                      '& textarea': {
                        minHeight: '75px',
                      }
                    }
                  }}
                />
              </Box>

              {/* Action Buttons */}
              <Box display="flex" gap={1.5}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                  disabled={!dirty}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                >
                  Delete
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default BookDetail;