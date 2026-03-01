import { useState } from 'react';
import API_CONFIG from '../config/api.js';

const useBookUpdate = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const updateBook = async (bookUuid, values) => {
    setIsUpdating(true);
    setError(null);

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/books/${bookUuid}`, {
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
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Error updating book:', err);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateBook,
    isUpdating,
    error,
  };
};

export default useBookUpdate;