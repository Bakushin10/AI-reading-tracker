const BookDetail = ({ book }) => {
  if (!book) {
    return (
      <div className="book-detail">
        <div className="book-detail-placeholder">
          <div className="placeholder-content">
            <h3>Select a book</h3>
            <p>Choose a book from the list to view details</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-detail">
      <div className="book-detail-content">
        <div className="book-detail-header">
          <h2 className="book-detail-title">{book.title}</h2>
          <div className="book-detail-meta">
            <span className="book-detail-date">
              Added on {new Date(book.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>

        {book.link && (
          <div className="book-detail-link">
            <h4>Source</h4>
            <a
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              {book.link}
            </a>
          </div>
        )}

        {book.memo && (
          <div className="book-detail-memo">
            <h4>Notes</h4>
            <div className="memo-content">
              {book.memo.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        )}

        <div className="book-detail-actions">
          <button className="action-btn edit-btn">
            Edit
          </button>
          <button className="action-btn delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;