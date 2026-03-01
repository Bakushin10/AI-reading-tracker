const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  ENDPOINTS: {
    BOOKS: '/api/books',
  }
};

export default API_CONFIG;