import { FC } from 'react'
import { useFetchCategories } from '../hooks/useFetchCategories'
import { Category } from '@/types/categoryTypes'

interface ArticlesByCategoriesProps {}

const ArticlesByCategories: FC<ArticlesByCategoriesProps> = () => {
  const { data: categories, isLoading } = useFetchCategories()

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Articles By Category</h2>
      {isLoading && <p>Loading...</p>}
      {categories &&
        categories.map((category: Category) => (
          <div key={category.id} className="my-4">
            <a
              href={`/articles/categories/${category.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-blue-500 underline"
            >
              {category.name}
            </a>
            {category.children &&
              category.children.length > 0 &&
              category.children.map((child: Category) => (
                <div key={child.id} className="ml-4">
                  <a
                    href={`/articles/categories/${child.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-blue-500 underline"
                  >
                    {child.name}
                  </a>
                </div>
              ))}
          </div>
        ))}
    </div>
  )
}

export default ArticlesByCategories
