import { FC } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import ArticleForm from './ArticleForm'

interface ArticleModalProps {
  children: React.ReactNode // Trigger element for the modal.
  type: 'delete' | 'edit' | 'create' // Modal type for corresponding actions.
  title: string // Modal title.
  description: string // Modal description.
  articleId?: string // Optional article ID for edit or delete actions.
}

const ArticleModal: FC<ArticleModalProps> = ({ children, type, title, description, articleId }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger> {/* Render trigger element */}
      <DialogContent className="max-w-[625px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle> {/* Display modal title */}
          <DialogDescription>{description}</DialogDescription> {/* Display modal description */}
        </DialogHeader>
        <ArticleForm type={type} articleId={articleId} /> {/* Render the ArticleForm */}
      </DialogContent>
    </Dialog>
  )
}

export default ArticleModal
