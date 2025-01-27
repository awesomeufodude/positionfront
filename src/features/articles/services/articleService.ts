import axios from 'axios'
import { apiArticleRoutes } from '../../../config'

export interface ArticleQueryParams {
  page?: number // Current page number.
  limit?: number // Number of articles per page.
  category?: string // Filter articles by category.
  isFavorite?: boolean // Filter favorite articles.
  minRating?: number // Filter articles by minimum rating.
}

// Fetch articles with optional query parameters.
export const fetchArticles = async (queryParams?: ArticleQueryParams) => {
  const response = await axios.get(apiArticleRoutes.getAll, { params: queryParams })
  return response.data
}

// Create a new article.
export const createArticle = async (article: {
  title: string
  description: string
  categoryId: string
  authorId: string
  rating: number
}) => {
  const response = await axios.post(apiArticleRoutes.create, article)
  return response.data
}

// Update an existing article by ID.
export const updateArticle = async (
  id: string,
  article: {
    title: string
    description: string
    categoryId: string
    rating: number
  },
) => {
  const response = await axios.put(apiArticleRoutes.update(id), article)
  return response.data
}

// Rate an article by ID.
export const rateArticle = async (id: string, rating: number) => {
  const response = await axios.patch(apiArticleRoutes.rating(id), { rating })
  return response.data
}

// Toggle the favorite status of an article by ID.
export const toggleFavorite = async (id: string) => {
  const response = await axios.patch(apiArticleRoutes.favorite(id))
  return response.data
}

// Fetch a single article by ID.
export const fetchArticleById = async (id: string) => {
  const response = await axios.get(apiArticleRoutes.getOne(id))
  return response.data
}

// Delete an article by ID.
export const deleteArticle = async (id: string) => {
  const response = await axios.delete(apiArticleRoutes.delete(id))
  return response.data
}

// Fetch articles by category ID.
export const fetchArticlesByCategory = async (categoryId: string) => {
  const response = await axios.get(apiArticleRoutes.byCategory(categoryId))
  return response.data
}
