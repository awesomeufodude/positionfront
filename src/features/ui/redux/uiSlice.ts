import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  isLoading: boolean // Loading state for UI.
  theme: 'light' | 'dark' // Current theme of the application.
}

const initialState: UIState = {
  isLoading: false,
  theme: 'light',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Sets the loading state.
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    // Toggles between light and dark themes.
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
  },
})

export const { setLoading, toggleTheme } = uiSlice.actions
export default uiSlice.reducer
