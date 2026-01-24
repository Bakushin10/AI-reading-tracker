import { useState } from 'react';

const BookList = ({ entries, onBookSelect, selectedBook, searchTerm, onSearchChange }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredAndSortedEntries = entries
    ?.filter(entry =>
      entry.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.memo?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (sortBy === 'date') {
        const dateA = new Date(aValue);
        const dateB = new Date(bValue);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      }

      const comparison = (aValue || '').localeCompare(bValue || '');
      return sortOrder === 'desc' ? -comparison : comparison;
    });

  return (
    <>
      <style>{`
        .book-list {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .book-list-header {
          padding: 20px;
          border-bottom: 1px solid #eee;
          background-color: white;
        }

        .search-container {
          margin-bottom: 16px;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px;
          font-size: 14px;
          border: 1px solid #ddd;
          border-radius: 6px;
          background-color: white;
          color: black;
          font-family: inherit;
        }

        .search-input:focus {
          outline: none;
          border-color: #2557a7;
          box-shadow: 0 0 0 2px rgba(37, 87, 167, 0.1);
        }

        .sort-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sort-select {
          padding: 8px 12px;
          font-size: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: white;
          color: black;
          font-family: inherit;
          cursor: pointer;
        }

        .sort-order-btn {
          padding: 8px 10px;
          font-size: 14px;
          font-weight: bold;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: white;
          color: black;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 32px;
        }

        .sort-order-btn:hover {
          background-color: #f5f5f5;
        }

        .book-list-info {
          padding: 12px 20px;
          background-color: #f8f9fa;
          border-bottom: 1px solid #eee;
          font-size: 14px;
          color: #666;
        }

        .search-info {
          font-style: italic;
        }

        .book-list-items {
          flex: 1;
          overflow-y: auto;
        }

        .book-list-item {
          padding: 12px 20px;
          border-bottom: 1px solid #eee;
          cursor: pointer;
          transition: background-color 0.2s ease;
          background-color: white;
        }

        .book-list-item:hover {
          background-color: #f8f9fa;
        }

        .book-list-item.selected {
          background-color: #e3f2fd;
          border-left: 4px solid #2557a7;
        }

        .book-item-content {
          width: 100%;
        }

        .book-item-title {
          font-size: 16px;
          font-weight: 600;
          color: #2557a7;
          margin: 0 0 8px 0;
          line-height: 1.4;
        }

        .book-item-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .book-item-date {
          font-size: 12px;
          color: #666;
        }

        .empty-list {
          padding: 40px 20px;
          text-align: center;
          color: #666;
        }

        .empty-list p {
          margin: 4px 0;
          font-size: 14px;
        }
      `}</style>
      <div className="book-list">
        <div className="book-list-header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="sort-controls">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date">Date</option>
              <option value="title">Title</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="sort-order-btn"
            >
              {sortOrder === 'desc' ? '↓' : '↑'}
            </button>
          </div>
        </div>

        <div className="book-list-info">
          <span className="book-count">
            {filteredAndSortedEntries?.length || 0} books
          </span>
          {searchTerm && (
            <span className="search-info">
              for "{searchTerm}"
            </span>
          )}
        </div>

        <div className="book-list-items">
          {filteredAndSortedEntries?.length === 0 ? (
            <div className="empty-list">
              <p>No books found</p>
              {searchTerm && <p>Try a different search term</p>}
            </div>
          ) : (
            filteredAndSortedEntries?.map((entry) => (
              <div
                key={entry.bookUuid}
                className={`book-list-item ${selectedBook?.bookUuid === entry.bookUuid ? 'selected' : ''}`}
                onClick={() => onBookSelect(entry)}
              >
                <div className="book-item-content">
                  <h3 className="book-item-title">{entry.title}</h3>
                  <div className="book-item-meta">
                    <span className="book-item-date">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default BookList;