import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFetchArticles } from '../hooks/useFetchArticles'
import ArticleTable from './ArticleTable'
import { articleColumns } from './ArticleColumnDef'
import Spinner from '@/components/ui/Spinner'
import ArticleModal from './ArticleModal'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import ArticlesByCategories from '@/features/categories/components/ArticlesByCategories'

const ArticleList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '4', 10)

  const { data, isLoading, error } = useFetchArticles({ page, limit })

  const handlePageChange = (newPage: number, limit: number) => {
    setSearchParams({ page: String(newPage), limit: String(limit) })
  }

  if (error) return <div>Error fetching articles: {error}</div>

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Articles</h1>
        <ArticleModal type="create" title="Create Article" description="Write and save a new article.">
          <Button data-cy="create-article-button">
            <Plus className="h-4 w-4" />
            Create Article
          </Button>
        </ArticleModal>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-[500px]">
          <Spinner title="Loading articles..." />
        </div>
      ) : (
        <>
          <ArticleTable
            data={data.data}
            columns={articleColumns}
            pagination={data.pagination}
            onPageChange={handlePageChange}
          />
          <ArticlesByCategories />
        </>
      )}
    </div>
  )
}

export default ArticleList
