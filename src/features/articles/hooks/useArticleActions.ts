import { useMutation, useQueryClient } from 'react-query'
import { createArticle, updateArticle, deleteArticle } from '../services/articleService'

// Custom hook for creating an article.
export const useCreateArticle = () => {
  const queryClient = useQueryClient()
  return useMutation(createArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries('articles') // Refresh articles list on success.
    },
  })
}

// Custom hook for updating an article.
export const useUpdateArticle = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({
      id,
      article,
    }: {
      id: string
      article: {
        title: string
        description: string
        categoryId: string
        rating: number
      }
    }) => updateArticle(id, article),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('articles') // Refresh articles list on success.
      },
    },
  )
}

// Custom hook for deleting an article.
export const useDeleteArticle = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries('articles') // Refresh articles list on success.
    },
  })
}
