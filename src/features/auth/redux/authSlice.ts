import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: { id: string; email: string } | null // User details.
  token: string | null // Authentication token.
  isAuthenticated: boolean // Whether the user is authenticated.
  isSessionChecked: boolean // Whether the session has been verified.
  isLoading: boolean // Loading state for authentication-related actions.
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isSessionChecked: false,
  isLoading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Handles successful login.
    loginSuccess(state, action: PayloadAction<{ user: { id: string; email: string }; token: string }>) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.isLoading = false
    },
    // Handles user logout.
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isLoading = false
    },
    // Restores session from a valid token.
    restoreSession(state, action: PayloadAction<{ user: { id: string; email: string }; token: string }>) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.isSessionChecked = true
      state.isLoading = false
    },
    // Marks session verification as complete.
    sessionCheckComplete(state) {
      state.isSessionChecked = true
    },
    // Sets loading state.
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
  },
})

export const { loginSuccess, logout, restoreSession, sessionCheckComplete, setLoading } = authSlice.actions
export default authSlice.reducer
