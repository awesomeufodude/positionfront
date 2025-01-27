import { Category } from './categoryTypes'

export interface Author {
  id: string
  username: string
  email: string
}

export interface Article {
  id: string
  title: string
  description: string
  categoryId: string
  authorId: string
  rating: number
  isFavorite: boolean
  createdAt: string
  updatedAt: string
  category: Category
  author: Author
}

export interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}
