import { Category } from '@/types/categoryTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CategoriesState {
  categories: Category[] // List of categories.
  isLoading: boolean // Loading state for API calls.
  error: string | null // Error message if API call fails.
  selectedCategory: string // ID of the currently selected category.
}

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
  selectedCategory: '',
}

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // Handles the start of fetching categories.
    fetchCategoriesStart(state) {
      state.isLoading = true
      state.error = null
    },
    // Handles successful fetching of categories.
    fetchCategoriesSuccess(state, action: PayloadAction<{ data: Category[] }>) {
      state.isLoading = false
      state.categories = action.payload.data
    },
    // Handles errors during category fetching.
    fetchCategoriesFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
    // Sets the selected category ID.
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload
    },
  },
})

export const { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure, setSelectedCategory } =
  categorySlice.actions
export default categorySlice.reducer
