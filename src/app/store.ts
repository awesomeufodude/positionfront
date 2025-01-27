import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/redux/authSlice'
import uiReducer from '../features/ui/redux/uiSlice'
import articleReducer from '../features/articles/redux/articleSlice'
import categoryReducer from '../features/categories/redux/categorySlice'

// Configure the Redux store by combining reducers for each feature module.
export const store = configureStore({
  reducer: {
    auth: authReducer, // Handles authentication state (e.g., user, tokens, session status).
    ui: uiReducer, // Manages UI-related state (e.g., loading, modals, notifications).
    articles: articleReducer, // Manages state for articles (e.g., fetching, creating, updating).
    category: categoryReducer, // Handles state for categories (e.g., listing, filtering).
  },
})

// Define the RootState type for accessing the overall shape of the Redux store.
export type RootState = ReturnType<typeof store.getState>

// Define the AppDispatch type for use with Redux actions.
export type AppDispatch = typeof store.dispatch
