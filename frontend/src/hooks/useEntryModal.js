import { useMutation, useQueryClient } from '@tanstack/react-query';
import { entryKeys } from './entryKeys';
import { v4 as uuidv4 } from 'uuid';

const useEntryModal = () => {
  const queryClient = useQueryClient();

  const createEntryMutation = useMutation({
    mutationFn: async (entryData) => {
      const bookData = {
        bookUuid: uuidv4(),
        title: entryData.title,
        link: entryData.link || undefined,
        date: entryData.date,
        memo: entryData.comment // Map comment to memo
      };

      const response = await fetch('http://localhost:8080/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) {
        throw new Error('Failed to create book entry');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: entryKeys.all });
    },
  });

  return {
    createEntryMutation,
    isLoading: createEntryMutation.isPending,
    error: createEntryMutation.error
  };
};

export default useEntryModal;