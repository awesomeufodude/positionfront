import HeartCheckBox from '@/components/HeartCheckBox'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit, EyeIcon, Trash2 } from 'lucide-react'
import moment from 'moment'
import ArticleModal from './ArticleModal'
import RateComponent from '@/components/RateComponent'
import { Link } from 'react-router-dom'
import { Article, Author } from '@/types/articleTypes'
import { Category } from '@/types/categoryTypes'


export const articleColumns: ColumnDef<Article>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Title
        <ArrowUpDown className="ml-2" />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue('title')}</div>,
  },
  {
    accessorKey: 'author',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Email
        <ArrowUpDown className="ml-2" />
      </Button>
    ),
    cell: ({ row }) => {
      const author = row.getValue('author') as Author
      return <div className="whitespace-wrap line-clamp-3">{author.email}</div>
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Category
        <ArrowUpDown className="ml-2" />
      </Button>
    ),
    cell: ({ row }) => {
      const category = row.getValue('category') as Category
      return <div className="whitespace-wrap line-clamp-3">{category.name}</div>
    },
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Rating
        <ArrowUpDown className="ml-2" />
      </Button>
    ),
    cell: ({ row }) => {
      const rating = row.getValue('rating') as number
      return <RateComponent rating={rating} articleId={row.original.id} />
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Created At
        <ArrowUpDown className="ml-2" />
      </Button>
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt') as string
      return <div className="whitespace-wrap line-clamp-3">{moment(createdAt).format('DD/MM/YYYY')}</div>
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Updated At
        <ArrowUpDown className="ml-2" />
      </Button>
    ),
    cell: ({ row }) => {
      const updatedAt = row.getValue('updatedAt') as string
      return <div className="whitespace-wrap line-clamp-3">{moment(updatedAt).format('DD/MM/YYYY')}</div>
    },
  },
  {
    accessorKey: 'isFavorite',
    header: () => <Button variant="ghost">Favorite</Button>,
    cell: ({ row }) => {
      const article = row.original
      return (
        <div className="flex items-center justify-center">
          <HeartCheckBox id={article.id} defaultChecked={article.isFavorite} />
        </div>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    header: () => <Button variant="ghost">Actions</Button>,
    cell: ({ row }) => {
      const article = row.original
      return (
        <div className="flex items-center justify-center gap-2">
          <ArticleModal
            children={
              <Button size="sm">
                <Edit />
              </Button>
            }
            type="edit"
            title="Edit Article"
            description="Update your article's details and save changes."
            articleId={article.id}
          />
          <ArticleModal
            children={
              <Button size="sm">
                <Trash2 />
              </Button>
            }
            type="delete"
            title="Delete Article"
            description="Are you sure you want to delete this article?"
            articleId={article.id}
          />
          <Link to={`/articles/${article.id}`} className="bg-black text-white px-2 py-1 rounded-lg">
            <EyeIcon />
          </Link>
        </div>
      )
    },
  },
]
