import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ArticleMockForm from '../components/ArticleMockForm'

const mockCreateArticle = jest.fn()

jest.mock('../hooks/useArticleActions', () => ({
  useCreateArticle: () => ({ mutate: mockCreateArticle, isLoading: false }),
}))

describe('ArticleForm Component', () => {
  beforeEach(() => {
    mockCreateArticle.mockClear()
  })

  it('should render the form correctly for creating an article', () => {
    render(<ArticleMockForm type="create" />)

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument()
    expect(screen.getByText(/Create/i)).toBeDisabled()
  })

  it('should enable the submit button when all fields are filled', () => {
    render(<ArticleMockForm type="edit" />)

    const titleInput = screen.getByLabelText(/Title/i)
    const descriptionInput = screen.getByLabelText(/Description/i)
    const createButton = screen.getByText(/Create/i)

    fireEvent.change(titleInput, { target: { value: 'Test Article' } })
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } })

    expect(createButton).not.toBeDisabled()
  })

  it('should call the createArticle function on form submission', () => {
    render(<ArticleMockForm type="create" onSubmit={(data) => mockCreateArticle(data)} />)

    const titleInput = screen.getByLabelText(/Title/i)
    const descriptionInput = screen.getByLabelText(/Description/i)
    const createButton = screen.getByText(/Create/i)

    fireEvent.change(titleInput, { target: { value: 'Test Article' } })
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } })
    fireEvent.click(createButton)

    // Verify the mockCreateArticle function was called
    expect(mockCreateArticle).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Test Article',
        description: 'Test Description',
      }),
    )
  })
})
