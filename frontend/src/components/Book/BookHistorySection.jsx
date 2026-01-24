import { useState } from 'react';
import BookList from './BookList';
import BookDetail from './BookDetail';

const BookHistorySection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  // Dummy data for testing
  const dummyEntries = [
    {
      bookUuid: '1',
      title: 'The Clean Code',
      link: 'https://example.com/clean-code',
      date: '2024-01-15',
      memo: 'Excellent book about writing maintainable and readable code. The principles outlined here have really improved my coding practices.'
    },
    {
      bookUuid: '2',
      title: 'React Design Patterns',
      link: 'https://example.com/react-patterns',
      date: '2024-01-10',
      memo: 'Great insights into modern React development patterns. The hooks section was particularly useful.'
    },
    {
      bookUuid: '3',
      title: 'JavaScript: The Good Parts',
      link: '',
      date: '2024-01-05',
      memo: 'Classic JavaScript book. A bit dated now but still has valuable insights about the core language features.'
    },
    {
      bookUuid: '4',
      title: 'System Design Interview',
      link: 'https://example.com/system-design',
      date: '2023-12-20',
      memo: 'Comprehensive guide to system design concepts. The scalability section was eye-opening.'
    },
    {
      bookUuid: '5',
      title: 'Database Internals',
      link: 'https://example.com/db-internals',
      date: '2023-12-15',
      memo: 'Deep dive into how databases work under the hood. Complex but very informative.'
    },
    {
      bookUuid: '6',
      title: 'Microservices Patterns',
      link: '',
      date: '2023-12-01',
      memo: 'Practical guide to microservices architecture. The event sourcing chapter was particularly interesting.'
    }
  ];

  // Use dummy data instead of API call for now
  const entries = dummyEntries;
  const isLoading = false;
  const error = null;

  // Commented out real API call for testing
  // const { data: entries, isLoading, error } = useQuery({
  //   queryKey: entryKeys.lists(),
  //   queryFn: async () => {
  //     const response = await fetch('http://localhost:8080/api/books');
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch books');
  //     }
  //     return response.json();
  //   },
  // });

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  if (isLoading) return <div className="loading">Loading entries...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="panels-container">
      <div className="left-panel">
        <BookList
          entries={entries}
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
  );
};

export default BookHistorySection;