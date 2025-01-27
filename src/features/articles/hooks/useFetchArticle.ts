import { useQuery } from 'react-query'
import { fetchArticleById } from '../services/articleService'
import { AppDispatch } from '../../../app/store'
import {
  fetchArticleFailure,
  fetchArticleStart,
  fetchArticleSuccess,
  resetSelectedArticle,
  setSelectedArticle,
} from '../redux/articleSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store'

const useFetchArticle = (id: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const { article } = useSelector((state: RootState) => state.articles)

  // React Query for fetching article data.
  const { data, isLoading, error } = useQuery(
    ['article', id],
    async () => {
      dispatch(fetchArticleStart())
      const articleData = await fetchArticleById(id)
      return articleData
    },
    {
      onSuccess: (data) => {
        if (data?.id !== article.id) {
          dispatch(fetchArticleSuccess({ data })) // Update Redux state with fetched article.
        }
      },
      onError: (error: any) => {
        dispatch(fetchArticleFailure(error.message || 'Failed to fetch article')) // Dispatch failure action on error.
      },
    },
  )

  // Updates the selected article in the Redux state.
  const updateArticle = (updatedArticle: Partial<typeof article>) => {
    dispatch(setSelectedArticle({ ...article, ...updatedArticle }))
  }

  // Resets the selected article in the Redux state.
  const resetArticle = () => {
    dispatch(resetSelectedArticle())
  }

  return {
    article: data || article, // Return the fetched or existing article from Redux state.
    isLoading,
    error,
    updateArticle,
    resetArticle,
  }
}

export default useFetchArticle
