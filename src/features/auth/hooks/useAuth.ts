import { useMutation, useQuery } from 'react-query'
import { register, login, fetchUser } from '../services/authService'
import { AppDispatch } from '../../../app/store'
import { loginSuccess, restoreSession, sessionCheckComplete } from '../redux/authSlice'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../ui/redux/uiSlice'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'

// Hook for user registration.
export const useRegister = () => {
  return useMutation(
    async ({ email, password, username }: { email: string; password: string; username: string; }) => {
      const data = await register(email, password,username) // Perform register request.
      return data
    },
    {
      onSuccess: (data) => {
        toast.success('Registration successful! Please log in.')
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.error)
        } else {
          toast.error('An unknown error occurred')
        }
      },
    },
  )
}

// Hook for user login.
export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>()
  return useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      dispatch(setLoading(true)) // Set loading state.
      const data = await login(email, password) // Perform login request.
      localStorage.setItem('token', data.token) // Store token in localStorage.
      return data
    },
    {
      onSuccess: (data) => {
        dispatch(loginSuccess({ user: data.user, token: data.token })) // Update Redux state on success.
        toast.success('Login successful!')
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.error)
        } else {
          toast.error('An unknown error occurred')
        }
      },
      onSettled: () => {
        dispatch(setLoading(false)) // Reset loading state after mutation settles.
      },
    },
  )
}

// Hook to restore session on app load.
export const useRestoreSession = () => {
  const dispatch = useDispatch<AppDispatch>()
  return useQuery(
    'restoreSession',
    async () => {
      const token = localStorage.getItem('token') // Retrieve token from localStorage.
      if (token) {
        dispatch(setLoading(true)) // Set loading state.
        const user = await fetchUser(token) // Fetch user details using token.
        dispatch(restoreSession({ user, token })) // Restore session in Redux state.
        return user
      }
      dispatch(sessionCheckComplete()) // Mark session check as complete if no token.
    },
    {
      retry: false, // Disable retries on failure.
      refetchOnWindowFocus: false, // Disable refetching on window focus.
      onSettled: () => {
        dispatch(setLoading(false)) // Reset loading state after query settles.
      },
    },
  )
}
