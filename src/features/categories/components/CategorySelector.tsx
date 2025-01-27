import { FC } from 'react'
import { useFetchCategories } from '../hooks/useFetchCategories'
import { Category } from '@/types/categoryTypes'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/store'
import { setSelectedCategory } from '../redux/categorySlice'
import { Label } from '@/components/ui/label'

const CategorySelector: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory)
  const { data: categories, isLoading, error } = useFetchCategories()

  const handleSelect = (id: string) => {
    if (id !== selectedCategory) {
      dispatch(setSelectedCategory(id))
    }
  }

  const renderCategories = (categories: Category[], level = 0) => {
    return categories.map((category) => (
      <div key={category.id} style={{ marginLeft: level * 20 }} className="my-2">
        <label className="flex items-center">
          <input
            type="radio"
            name="category"
            value={category.id}
            checked={selectedCategory === category.id}
            onChange={() => handleSelect(category.id)}
            className="mr-2"
            data-testid="56be2619-f8a0-44ae-9e50-615433664395"
          />
          {category.name}
        </label>
        {category.children && category.children.length > 0 && renderCategories(category.children, level + 1)}
      </div>
    ))
  }

  return (
    <div>
      <Label htmlFor="category">Select a Category</Label>
      {isLoading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load categories. Please try again.</p>
      ) : categories && categories.length > 0 ? (
        <div>{renderCategories(categories)}</div>
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  )
}

export default CategorySelector
