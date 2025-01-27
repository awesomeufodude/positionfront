import { Article, Pagination } from '@/types/articleTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ArticlesState {
  articles: Article[]
  pagination: Pagination | null
  isLoading: boolean
  error: string | null
  article: Article
  openModal: boolean
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
    fetchArticlesStart(state) {
      state.isLoading = true
      state.error = null
    },
    fetchArticlesSuccess(state, action: PayloadAction<{ data: Article[]; pagination: Pagination }>) {
      state.isLoading = false
      state.articles = action.payload.data
      state.pagination = action.payload.pagination
    },
    fetchArticlesFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    fetchArticleStart(state) {
      state.isLoading = true
      state.error = null
    },
    fetchArticleSuccess(state, action: PayloadAction<{ data: Article }>) {
      state.isLoading = false
      state.article = action.payload.data
    },
    fetchArticleFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    setSelectedArticle(state, action: PayloadAction<Article>) {
      state.article = action.payload
    },
    resetSelectedArticle(state) {
      state.article = initialState.article
    },
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
