export const BookTypes = {
  Book: {
    bookUuid: '',
    title: '',
    link: '',
    date: '',
    memo: '',
    createdAt: new Date(),
    updatedAt: new Date()
  },

  BooksByPageResponse: {
    books: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalCount: 0,
      pageSize: 10
    }
  },

  PaginationParams: {
    page: 1,
    pageSize: 10
  }
};