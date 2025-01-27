import { useQuery } from 'react-query'
import { AppDispatch } from '../../../app/store'
import { useDispatch } from 'react-redux'
import { fetchCategoriesFailure, fetchCategoriesStart, fetchCategoriesSuccess } from '../redux/categorySlice'
import { fetchCategories } from '../services/categoryService'

export const useFetchCategories = () => {
  const dispatch = useDispatch<AppDispatch>()

  // Dispatch the action to indicate the start of category fetching.
  dispatch(fetchCategoriesStart())

  return useQuery(
    ['categories'],
    () => fetchCategories(), // Fetch categories from the service.
    {
      onSuccess: (data) => {
        dispatch(fetchCategoriesSuccess(data)) // Dispatch success action with the fetched categories.
      },
      onError: (error: any) => {
        dispatch(fetchCategoriesFailure(error.message)) // Dispatch failure action with the error message.
      },
    },
  )
}
