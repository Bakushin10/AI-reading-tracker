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
  );
};

export default BookList;