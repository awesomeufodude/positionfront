import { Article, Pagination } from '@/types/articleTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ArticlesState {
  articles: Article[] // List of articles.
  pagination: Pagination | null // Pagination details.
  isLoading: boolean // Loading state for API calls.
  error: string | null // Error message if API call fails.
  article: Article // Selected or single article details.
  openModal: boolean // State to manage modal visibility.
}

const initialState: ArticlesState = {
  articles: [],
  pagination: null,
  isLoading: false,
  error: null,
  article: {
    id: '',
    title: '',
    description: '',
    categoryId: '',
    authorId: '',
    rating: 0,
    isFavorite: false,
    createdAt: '',
    updatedAt: '',
    category: {
      id: '',
      name: '',
      parentId: null,
      children: [],
    },
    author: {
      id: '',
      username: '',
      email: '',
    },
  },
  openModal: false,
}

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    // Handles the start of fetching articles.
    fetchArticlesStart(state) {
      state.isLoading = true
      state.error = null
    },
    // Handles successful fetching of articles.
    fetchArticlesSuccess(state, action: PayloadAction<{ data: Article[]; pagination: Pagination }>) {
      state.isLoading = false
      state.articles = action.payload.data
      state.pagination = action.payload.pagination
    },
    // Handles errors during fetching articles.
    fetchArticlesFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    // Handles the start of fetching a single article.
    fetchArticleStart(state) {
      state.isLoading = true
      state.error = null
    },
    // Handles successful fetching of a single article.
    fetchArticleSuccess(state, action: PayloadAction<{ data: Article }>) {
      state.isLoading = false
      state.article = action.payload.data
    },
    // Handles errors during fetching a single article.
    fetchArticleFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    // Sets the selected article.
    setSelectedArticle(state, action: PayloadAction<Article>) {
      state.article = action.payload
    },
    // Resets the selected article to its initial state.
    resetSelectedArticle(state) {
      state.article = initialState.article
    },
    // Toggles the open modal state.
    setOpenModal(state, action: PayloadAction<boolean>) {
      state.openModal = action.payload
    },
  },
})

export const {
  fetchArticlesStart,
  fetchArticlesSuccess,
  fetchArticlesFailure,
  fetchArticleStart,
  fetchArticleSuccess,
  fetchArticleFailure,
  setSelectedArticle,
  resetSelectedArticle,
  setOpenModal,
} = articleSlice.actions

export default articleSlice.reducer
