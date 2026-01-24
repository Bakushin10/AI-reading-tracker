const BookDetail = ({ book }) => {
  if (!book) {
    return (
      <>
        <style>{`
          .book-detail {
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .book-detail-placeholder {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .placeholder-content {
            text-align: center;
            color: #666;
          }

          .placeholder-content h3 {
            font-size: 32px;
            margin-bottom: 16px;
            font-weight: 700;
            color: #333;
          }

          .placeholder-content p {
            font-size: 20px;
            line-height: 1.5;
            color: #666;
          }
        `}</style>
        <div className="book-detail">
          <div className="book-detail-placeholder">
            <div className="placeholder-content">
              <h3>Select a book</h3>
              <p>Choose a book from the list to view details</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        .book-detail {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .book-detail-content {
          padding: 30px;
          flex: 1;
          overflow-y: auto;
        }

        .book-detail-header {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #ddd;
        }

        .book-detail-title {
          font-size: 28px;
          font-weight: 700;
          color: black;
          margin: 0 0 12px 0;
          line-height: 1.3;
        }

        .book-detail-meta {
          color: #666;
          font-size: 14px;
        }

        .book-detail-date {
          font-weight: 500;
        }

        .book-detail-link {
          margin-bottom: 30px;
        }

        .book-detail-link h4 {
          font-size: 16px;
          font-weight: 600;
          color: black;
          margin: 0 0 12px 0;
        }

        .external-link {
          color: #2557a7;
          text-decoration: none;
          font-size: 14px;
          word-break: break-all;
          border-bottom: 1px solid #2557a7;
        }

        .external-link:hover {
          opacity: 0.8;
        }

        .book-detail-memo {
          margin-bottom: 30px;
        }

        .book-detail-memo h4 {
          font-size: 16px;
          font-weight: 600;
          color: black;
          margin: 0 0 16px 0;
        }

        .memo-content p {
          font-size: 15px;
          line-height: 1.6;
          color: #333;
          margin-bottom: 12px;
        }

        .memo-content p:last-child {
          margin-bottom: 0;
        }

        .book-detail-actions {
          display: flex;
          gap: 12px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
        }

        .action-btn {
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 500;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s ease;
        }

        .edit-btn {
          background-color: #2557a7;
          color: white;
          border-color: #2557a7;
        }

        .edit-btn:hover {
          background-color: #1e4a8c;
        }

        .delete-btn {
          background-color: white;
          color: #d32f2f;
          border-color: #d32f2f;
        }

        .delete-btn:hover {
          background-color: #d32f2f;
          color: white;
        }
      `}</style>
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
    </>
  );
};

export default BookDetail;