import React from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { Formik, Form } from 'formik';
import useBookUpdate from '../../hooks/useBookUpdate';

const styles = `
  .book-detail-input .MuiOutlinedInput-root {
    font-size: 12px;
    font-weight: 700;
    background-color: #111111;
    color: #ffffff;
    border: 2px solid #333333;
    border-radius: 6px;
  }

  .book-detail-input .MuiOutlinedInput-root input {
    padding: 12px;
    color: #ffffff;
  }

  .book-detail-input .MuiOutlinedInput-root:hover {
    border: 2px solid #555555;
  }

  .book-detail-input .MuiOutlinedInput-root.Mui-focused {
    border: 2px solid #00bcd4;
    box-shadow: 0 0 0 2px rgba(0, 188, 212, 0.2);
  }

  .book-detail-input .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  .book-detail-memo {
    flex: 1;
    height: 100%;
  }

  .book-detail-memo .MuiOutlinedInput-root {
    background-color: #111111;
    color: #ffffff;
    border: 2px solid #333333;
    border-radius: 6px;
    height: 100%;
    align-items: flex-start;
  }

  .book-detail-memo .MuiOutlinedInput-root textarea {
    color: #ffffff;
    height: 100% !important;
    overflow-y: auto !important;
    box-sizing: border-box;
  }

  .book-detail-memo .MuiOutlinedInput-root:hover {
    border: 2px solid #555555;
  }

  .book-detail-memo .MuiOutlinedInput-root.Mui-focused {
    border: 2px solid #00bcd4;
    box-shadow: 0 0 0 2px rgba(0, 188, 212, 0.2);
  }

  .book-detail-memo .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  .book-detail-save-btn {
    background-color: #00bcd4 !important;
    color: #000000 !important;
    border: 2px solid #00bcd4 !important;
    border-radius: 6px !important;
  }

  .book-detail-save-btn:hover {
    background-color: transparent !important;
    color: #00bcd4 !important;
  }

  .book-detail-save-btn:disabled {
    background-color: #333333 !important;
    color: #888888 !important;
    border: 2px solid #333333 !important;
  }

  .book-detail-delete-btn {
    color: #ffffff !important;
    border-color: #666666 !important;
    border: 2px solid #666666 !important;
    border-radius: 6px !important;
  }

  .book-detail-delete-btn:hover {
    background-color: #333333 !important;
    border-color: #ffffff !important;
  }

  .book-detail-link {
    font-size: 18px;
    text-decoration: none;
    filter: hue-rotate(180deg);
  }

  .book-detail-link:hover {
    transform: scale(1.1);
  }
`;

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
    <>
      <style>{styles}</style>
      <Box height="100%" display="flex" flexDirection="column" bgcolor="#000000">
        <Box px={4} pb={4} pt={1} flex={1} overflow="auto" display="flex" flexDirection="column">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, handleChange, dirty, handleSubmit }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              {/* Title Input */}
              <Box mb={2}>
                <TextField
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  placeholder="Book title..."
                  variant="outlined"
                  fullWidth
                  className="book-detail-input"
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
                    className="book-detail-link"
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
              <Box mb={1} flex={1} display="flex" flexDirection="column">
                <TextField
                  name="memo"
                  value={values.memo}
                  onChange={handleChange}
                  placeholder="Your thoughts on this reading..."
                  multiline
                  variant="outlined"
                  fullWidth
                  className="book-detail-memo"
                />
              </Box>

              {/* Action Buttons */}
              <Box display="flex" gap={1.5}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={!dirty}
                  color="success"
                  className="book-detail-save-btn"
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  className="book-detail-delete-btn"
                >
                  Delete
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
    </>
  );
};

export default BookDetail;
