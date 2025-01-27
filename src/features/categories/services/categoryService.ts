import { apiCategoryRoutes } from '@/config'
import axios from 'axios'

// Fetches all categories from the API.
export const fetchCategories = async () => {
  const response = await axios.get(apiCategoryRoutes.getAll)
  return response.data
}
