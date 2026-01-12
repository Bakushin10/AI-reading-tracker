import { useState } from 'react'
import './App.css'

/**
 * Main application component for the AI Reading Tracker.
 * Manages book collection and reading progress tracking.
 * @returns {JSX.Element} The main application interface
 */
function App() {
  const [books, setBooks] = useState([])
  const [currentBook, setCurrentBook] = useState('')
  const [readingProgress, setReadingProgress] = useState(0)

  /**
   * Adds a new book to the reading list.
   * Creates a book object with unique ID, title, and initial progress.
   */
  const addBook = () => {
    if (currentBook.trim()) {
      setBooks([...books, {
        id: Date.now(),
        title: currentBook,
        progress: 0,
        dateAdded: new Date().toLocaleDateString()
      }])
      setCurrentBook('')
    }
  }

  /**
   * Updates the reading progress for a specific book.
   * @param {number} bookId - The unique identifier of the book
   * @param {number} progress - The new progress percentage (0-100)
   */
  const updateProgress = (bookId, progress) => {
    setBooks(books.map(book =>
      book.id === bookId ? { ...book, progress } : book
    ))
  }

  /**
   * Removes a book from the reading list.
   * @param {number} bookId - The unique identifier of the book to remove
   */
  const removeBook = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId))
  }

  return (
    <div className="app">
      <header>
        <h1>AI Reading Tracker</h1>
        <p>Track your reading progress</p>
      </header>

      <main>
        <section className="add-book">
          <h2>Add New Book</h2>
          <div className="input-group">
            <input
              type="text"
              value={currentBook}
              onChange={(e) => setCurrentBook(e.target.value)}
              placeholder="Enter book title"
              onKeyPress={(e) => e.key === 'Enter' && addBook()}
            />
            <button onClick={addBook}>Add Book</button>
          </div>
        </section>

        <section className="book-list">
          <h2>Your Books ({books.length})</h2>
          {books.length === 0 ? (
            <p className="empty-state">No books added yet. Add your first book above!</p>
          ) : (
            <div className="books-grid">
              {books.map(book => (
                <div key={book.id} className="book-card">
                  <div className="book-header">
                    <h3>{book.title}</h3>
                    <button
                      className="remove-btn"
                      onClick={() => removeBook(book.id)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="book-details">
                    <p>Added: {book.dateAdded}</p>
                    <div className="progress-section">
                      <label>Progress: {book.progress}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={book.progress}
                        onChange={(e) => updateProgress(book.id, parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
