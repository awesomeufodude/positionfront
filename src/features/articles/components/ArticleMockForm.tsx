import { FC, useState } from 'react'

interface ArticleMockFormProps {
  type: string
  onSubmit?: (data: { title: string; description: string }) => void
}

const ArticleMockForm: FC<ArticleMockFormProps> = ({ type, onSubmit }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.({ title, description })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Description
        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button type="submit" disabled={type === 'create' && (!title || !description)}>
        Create
      </button>
    </form>
  )
}

export default ArticleMockForm
