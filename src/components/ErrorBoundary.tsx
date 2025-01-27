import React, { Component, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode // The child components wrapped by the ErrorBoundary.
}

interface ErrorBoundaryState {
  hasError: boolean // Tracks if an error has occurred.
  errorMessage: string | null // Stores the error message if an error occurs.
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, errorMessage: null }
  }

  // Update state if an error is caught during rendering.
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message }
  }

  // Log error details to the console or an external service.
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  // Reset error state and allow retrying the operation.
  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-red-500">Something went wrong!</h1>
          <p className="text-gray-700">{this.state.errorMessage}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              this.handleRetry()
              window.location.reload()
            }}
          >
            Retry
          </button>
        </div>
      )
    }

    return this.props.children // Render child components if no error occurred.
  }
}

export default ErrorBoundary
