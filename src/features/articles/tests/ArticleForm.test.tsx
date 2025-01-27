import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { setSelectedCategory } from '@/features/categories/redux/categorySlice'
import ArticleForm from '../components/ArticleForm'

const mockStore = configureStore([])

describe('ArticleForm Component', () => {
  let store: ReturnType<typeof mockStore>

  beforeEach(() => {
    store = mockStore({
      auth: { user: { id: '123' } },
      category: { selectedCategory: '1' },
    })
    store.dispatch = jest.fn()
  })

  it('should render the form correctly for creating an article', () => {
    render(
      <Provider store={store}>
        <ArticleForm type="create" />
      </Provider>,
    )

    expect(screen.getByLabelText(/Title/i)).toBe
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Rating/i)).toBeInTheDocument()
    expect(screen.getByText(/Create/i)).toBeDisabled() // Button should be disabled initially
  })

  it('should enable the submit button when all fields are filled', () => {
    render(
      <Provider store={store}>
        <ArticleForm type="create" />
      </Provider>,
    )

    const titleInput = screen.getByLabelText(/Title/i)
    const descriptionInput = screen.getByLabelText(/Description/i)
    const createButton = screen.getByText(/Create/i)

    fireEvent.change(titleInput, { target: { value: 'Test Article' } })
    fireEvent.change(descriptionInput, { target: { value: 'This is a test article.' } })

    expect(createButton).toBeDisabled() // Still disabled without a category

    store.dispatch(setSelectedCategory('1'))
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } }) // Trigger re-render

    expect(createButton).not.toBeDisabled()
  })

  it('should call the createArticle function on form submission', () => {
    const mockCreateArticle = jest.fn()

    jest.mock('../hooks/useArticleActions', () => ({
      useCreateArticle: () => ({ mutate: mockCreateArticle, isLoading: false }),
    }))

    render(
      <Provider store={store}>
        <ArticleForm type="create" />
      </Provider>,
    )

    const titleInput = screen.getByLabelText(/Title/i)
    const descriptionInput = screen.getByLabelText(/Description/i)
    const createButton = screen.getByText(/Create/i)

    fireEvent.change(titleInput, { target: { value: 'Test Article' } })
    fireEvent.change(descriptionInput, { target: { value: 'This is a test article.' } })
    store.dispatch(setSelectedCategory('1'))
    fireEvent.click(createButton)

    expect(mockCreateArticle).toHaveBeenCalledWith(
      {
        title: 'Test Article',
        description: 'This is a test article.',
        categoryId: '1',
        authorId: '123',
        rating: 0,
      },
      expect.anything(),
    )
  })
})
