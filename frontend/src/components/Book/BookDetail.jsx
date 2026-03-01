import React from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { Formik, Form } from 'formik';
import useBookUpdate from '../../hooks/useBookUpdate';

const BookDetail = ({ book, onBookUpdate }) => {
  const { updateBook } = useBookUpdate();
  const initialValues = {
    title: book?.title || '',
    memo: book?.memo || ''
  };

  const handleSubmit = async (values) => {
    try {
      const result = await updateBook(book.bookUuid, values);
      onBookUpdate(result);
    } catch (err) {
      // Error is already handled in the hook
    }
  };

  if (!book) {
    return (
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="#000000"
      >
        <Box textAlign="center">
          <Typography variant="h4" fontWeight={600} color="#ffffff" mb={2}>
            Select a book
          </Typography>
          <Typography variant="h6" color="#00bcd4">
            Choose a book from the list to view details
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box height="100%" display="flex" flexDirection="column" bgcolor="#000000">
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
                      backgroundColor: '#111111',
                      color: '#ffffff',
                      border: '2px solid #333333',
                      borderRadius: '6px',
                      '& input': {
                        padding: '12px',
                        color: '#ffffff',
                      },
                      '&:hover': {
                        border: '2px solid #555555',
                      },
                      '&.Mui-focused': {
                        border: '2px solid #00bcd4',
                        boxShadow: '0 0 0 2px rgba(0, 188, 212, 0.2)',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
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
                      filter: 'hue-rotate(180deg)',
                      '&:hover': { transform: 'scale(1.1)' }
                    }}
                  >
                    🔗
                  </Link>
                )}
                <Typography variant="body2" color="#00bcd4" fontWeight={500}>
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
                      backgroundColor: '#111111',
                      color: '#ffffff',
                      border: '2px solid #333333',
                      borderRadius: '6px',
                      '& textarea': {
                        minHeight: '75px',
                        color: '#ffffff',
                      },
                      '&:hover': {
                        border: '2px solid #555555',
                      },
                      '&.Mui-focused': {
                        border: '2px solid #00bcd4',
                        boxShadow: '0 0 0 2px rgba(0, 188, 212, 0.2)',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      }
                    }
                  }}
                />
              </Box>

              {/* Action Buttons */}
              <Box display="flex" gap={1.5}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={!dirty}
                  color="success"
                  sx={{
                    backgroundColor: '#00bcd4',
                    color: '#000000',
                    border: '2px solid #00bcd4',
                    borderRadius: '6px',
                    padding: '10px 20px',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#00bcd4',
                    },
                    '&:disabled': {
                      backgroundColor: '#333333',
                      color: '#888888',
                      border: '2px solid #333333',
                    }
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    color: '#ffffff',
                    borderColor: '#666666',
                    border: '2px solid #666666',
                    borderRadius: '6px',
                    padding: '10px 20px',
                    '&:hover': {
                      backgroundColor: '#333333',
                      borderColor: '#ffffff',
                    }
                  }}
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
