import { useQuery } from 'react-query'
import { fetchArticles, ArticleQueryParams } from '../services/articleService'
import { AppDispatch } from '../../../app/store'
import { fetchArticlesStart, fetchArticlesSuccess, fetchArticlesFailure } from '../redux/articleSlice'
import { useDispatch } from 'react-redux'

export const useFetchArticles = (queryParams?: ArticleQueryParams) => {
  const dispatch = useDispatch<AppDispatch>()

  // Dispatch action to indicate the start of articles fetching.
  dispatch(fetchArticlesStart())

  return useQuery(
    ['articles', queryParams],
    () => fetchArticles(queryParams), // Fetch articles with the provided query parameters.
    {
      onSuccess: (data) => {
        dispatch(fetchArticlesSuccess(data)) // Dispatch success action with the fetched data.
      },
      onError: (error: any) => {
        dispatch(fetchArticlesFailure(error.message)) // Dispatch failure action with the error message.
      },
    },
  )
}
