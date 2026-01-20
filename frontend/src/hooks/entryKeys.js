export const entryKeys = {
  all: ['entries'],
  lists: () => [...entryKeys.all, 'list'],
  list: (filters) => [...entryKeys.lists(), { filters }],
  details: () => [...entryKeys.all, 'detail'],
  detail: (id) => [...entryKeys.details(), id],
};