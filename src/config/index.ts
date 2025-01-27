// Define API base URLs based on environment variables.
export const PROD_API_URL = `${import.meta.env.VITE_PROD_BACKEND_URL}/api` // Production API base URL.
export const DEV_API_URL = `${import.meta.env.VITE_DEV_BACKEND_URL}/api` // Development API base URL.
export const API_URL = import.meta.env.DEV ? DEV_API_URL : PROD_API_URL // Automatically select API URL based on the environment.

// Authentication-related API endpoints.
export const apiAuthRoutes = {
  login: `${API_URL}/users/login`, // Login endpoint.
  register: `${API_URL}/users/register`, // Registration endpoint.
  me: `${API_URL}/users/me`, // Fetch current user details.
}

// Article-related API endpoints.
export const apiArticleRoutes = {
  getAll: `${API_URL}/articles`, // Fetch all articles.
  create: `${API_URL}/articles`, // Create a new article.
  update: (id: string) => `${API_URL}/articles/${id}`, // Update an article by ID.
  rating: (id: string) => `${API_URL}/articles/${id}/rate`, // Rate an article by ID.
  favorite: (id: string) => `${API_URL}/articles/${id}/favorite`, // Mark an article as favorite by ID.
  getOne: (id: string) => `${API_URL}/articles/${id}`, // Fetch a single article by ID.
  delete: (id: string) => `${API_URL}/articles/${id}`, // Delete an article by ID.
  byCategory: (categoryId: string) => `${API_URL}/articles/categories/${categoryId}`, // Fetch articles by category ID.
}

// Category-related API endpoints.
export const apiCategoryRoutes = {
  getAll: `${API_URL}/categories`, // Fetch all categories.
}
