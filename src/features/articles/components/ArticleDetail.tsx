import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '@/components/LoadingScreen'
import { fetchArticleById } from '../services/articleService'
import { Article } from '@/types/articleTypes'

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>() // Extract article ID from route params.
  const [article, setArticle] = useState<Article>({} as Article) // State to hold the article details.
  const [loading, setLoading] = useState(true) // State to manage loading status.
  const [error, setError] = useState<string | null>(null) // State to manage error messages.

  useEffect(() => {
    if (!id) return // Exit early if no ID is provided.

    const loadArticle = async () => {
      try {
        const data = await fetchArticleById(id) // Fetch the article by ID.
        setArticle(data) // Update the state with the fetched article.
      } catch (err) {
        setError('Failed to fetch the article.') // Set error message on failure.
      } finally {
        setLoading(false) // Ensure loading state is updated.
      }
    }

    loadArticle()
  }, [id]) // Re-run effect when ID changes.

  if (loading) return <LoadingScreen /> // Show loading screen while fetching.
  if (error) return <p>{error}</p> // Display error message if fetching fails.

  return (
    <div className="max-w-6xl mx-auto p-4">
      {article && (
        <>
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <p className="text-gray-600 mb-2">Category: {article.category.name}</p>
          <p className="text-gray-600 mb-2">Author: {article.author.username}</p>
          <p className="text-gray-600 mb-2">Published: {new Date(article.createdAt).toLocaleDateString()}</p>
          <div className="mt-4">
            <p>{article.description}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default ArticleDetail
