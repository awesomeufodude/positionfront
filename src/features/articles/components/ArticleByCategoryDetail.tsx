import LoadingScreen from '@/components/LoadingScreen'
import { FC, useEffect, useState } from 'react'
import { fetchArticlesByCategory } from '../services/articleService'
import { useParams } from 'react-router-dom'
import { Article } from '@/types/articleTypes'

interface ArticleByCategoryDetailProps {}

const ArticleByCategoryDetail: FC<ArticleByCategoryDetailProps> = () => {
  const { id } = useParams<{ id: string }>() // Extract category ID from route params.
  const [articles, setArticles] = useState<Article[]>([]) // State for fetched articles.
  const [loading, setLoading] = useState(true) // State for loading status.
  const [error, setError] = useState<string | null>(null) // State for error messages.

  useEffect(() => {
    if (!id) return // Exit early if no ID is present.

    const loadArticles = async () => {
      try {
        const data = await fetchArticlesByCategory(id) // Fetch articles by category ID.
        setArticles(data)
      } catch (err: any) {
        setError('No articles found') // Handle errors gracefully.
      } finally {
        setLoading(false) // Ensure loading state is updated.
      }
    }

    loadArticles()
  }, [id]) // Re-run effect when ID changes.

  if (loading) return <LoadingScreen /> // Display loading screen while fetching.
  if (error) return <p>{error}</p> // Display error message if an error occurs.

  return (
    <div className="max-w-6xl mx-auto p-4 my-4">
      {articles.length > 0 ? (
        <div>
          <h1 className="text-5xl font-bold mb-8">Articles</h1>
          {articles.map((article) => (
            <div key={article.id} className="mb-8">
              <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
              <p className="text-gray-600 mb-2">Category: {article.category.name}</p>
              <p className="text-gray-600 mb-2">Author: {article.author.username}</p>
              <p className="text-gray-600 mb-2">Published: {new Date(article.createdAt).toLocaleDateString()}</p>
              <div className="mt-4">
                <p>{article.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No articles available for this category.</p>
      )}
    </div>
  )
}

export default ArticleByCategoryDetail
