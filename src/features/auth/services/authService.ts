import axios from 'axios'
import { apiAuthRoutes } from '../../../config'

// Register a new user.
export const register = async (email: string, password: string, username: string) => {
  const response = await axios.post(`${apiAuthRoutes.register}`, { email, password, username })
  return response.data
}

// Log in an existing user.
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${apiAuthRoutes.login}`, { email, password })
  return response.data
}

// Fetch user details using a token.
export const fetchUser = async (token: string) => {
  const response = await axios.get(`${apiAuthRoutes.me}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

// Axios interceptor to attach the token to all requests.
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
