import { useState } from 'react';
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

  if (isLoading) return <div className="loading">Loading entries...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <>
      <style>{`
        .panels-container {
          display: flex;
          gap: 20px;
          margin: 0 auto;
          max-width: 1070px;
          height: calc(100vh - 200px);
        }

        .left-panel {
          width: 300px;
          min-width: 300px;
          background-color: white;
          border: 2px solid black;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
        }

        .right-panel {
          width: 750px;
          min-width: 750px;
          max-width: 750px;
          background-color: #fafafa;
          border: 2px solid black;
          border-radius: 8px;
          overflow-y: auto;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .loading {
          text-align: center;
          padding: 80px 20px;
          font-size: 18px;
          color: #666;
        }

        .error {
          text-align: center;
          padding: 80px 20px;
          font-size: 16px;
          color: #d32f2f;
          background-color: #ffeaa7;
          border: 2px solid #d32f2f;
          border-radius: 6px;
          margin-bottom: 20px;
        }
      `}</style>
      <div className="panels-container">
        <div className="left-panel">
          <BookList
            entries={books}
            onBookSelect={handleBookSelect}
            selectedBook={selectedBook}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </div>

        <div className="right-panel">
          <BookDetail book={selectedBook} />
        </div>
      </div>
    </>
  );
};

export default BookHistorySection;