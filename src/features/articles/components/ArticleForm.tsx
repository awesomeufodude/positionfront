import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCreateArticle, useDeleteArticle, useUpdateArticle } from '../hooks/useArticleActions'
import { AppDispatch, RootState } from '@/app/store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import CategorySelector from '@/features/categories/components/CategorySelector'
import { Button } from '@/components/ui/button'
import useFetchArticle from '../hooks/useFetchArticle'
import { setSelectedCategory } from '@/features/categories/redux/categorySlice'
import RateComponent from '@/components/RateComponent'
import useDismissModal from '../hooks/useDismisModal'
import toast from 'react-hot-toast'

interface ArticleFormProps {
  type: 'delete' | 'edit' | 'create'
  articleId?: string
}

const ArticleForm: FC<ArticleFormProps> = ({ type, articleId }) => {
  const dispatch = useDispatch<AppDispatch>()
  const authorId = useSelector((state: RootState) => state.auth.user?.id)
  const {dismiss} = useDismissModal()
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory)

  const { article, isLoading: isFetching, error, updateArticle, resetArticle } = useFetchArticle(articleId || '')

  const { mutate: createArticle, isLoading: isCreating } = useCreateArticle()
  const { mutate: updateArticleMutate, isLoading: isUpdating } = useUpdateArticle()
  const { mutate: deleteArticle, isLoading: isDeleting } = useDeleteArticle()

  const isLoading = isFetching || isCreating || isUpdating || isDeleting

  const [localTitle, setLocalTitle] = useState('')
  const [localDescription, setLocalDescription] = useState('')
  const [rating, setRating] = useState(0)

  useEffect(() => {
    if (type === 'edit' && articleId && article) {
      setLocalTitle(article.title || '')
      setLocalDescription(article.description || '')
      dispatch(setSelectedCategory(article.category.id))
      setRating(article.rating)
    }
  }, [type, articleId, article])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (type === 'create' && authorId) {
      createArticle(
        { title: localTitle, description: localDescription, categoryId: selectedCategory, authorId, rating: rating },
        { onSuccess: () => {
          dismiss();
          resetArticle();
          toast.success('Article created successfully');
        } },
      )
    } else if (type === 'edit' && articleId) {
      updateArticleMutate(
        {
          id: articleId,
          article: { title: localTitle, description: localDescription, categoryId: selectedCategory, rating },
        },
        {
          onSuccess: () => {
            dismiss();
            resetArticle();
            toast.success('Article updated successfully');
          },
        },
      )
    } else if (type === 'delete' && articleId) {
      deleteArticle(articleId, {
        onSuccess: () => {
          dismiss();
          resetArticle();
          toast.success('Article deleted successfully')
        },
      })
    }
  }

  const renderButton = () => {
    const isFormValid =
      (type === 'create' || type === 'edit') && localTitle.trim() && localDescription.trim() && selectedCategory

    if (type === 'create') {
      return (
        <Button type="submit" disabled={isLoading || !isFormValid}>
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
      )
    } else if (type === 'edit') {
      return (
        <Button type="submit" disabled={isLoading || !isFormValid}>
          {isLoading ? 'Updating...' : 'Save'}
        </Button>
      )
    } else if (type === 'delete') {
      return (
        <Button type="submit" disabled={isLoading || !localTitle} variant="destructive">
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      {type === 'delete' ? (
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Type your title"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            className='my-2'
          />
          <p className="text-sm text-gray-500">
            Enter the <b>{article?.title}</b> to confirm deletion
          </p>
        </div>
      ) : (
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Type your title"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            required
            className="my-2"
          />
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Type your description"
            value={localDescription}
            onChange={(e) => setLocalDescription(e.target.value)}
            rows={4}
            className="my-2"
          />
          <Label htmlFor="rating">Rating</Label>
          <RateComponent rating={rating} setRating={setRating} articleId={article?.id || ''} />
          <CategorySelector />
        </div>
      )}
      <div className="flex justify-end">{renderButton()}</div>
    </form>
  )
}

export default ArticleForm
