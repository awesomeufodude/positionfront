import { useGlobalError } from '@/context/GlobalErrorContext'
import React from 'react'

const GlobalErrorNotification: React.FC = () => {
  const { error, setError } = useGlobalError() // Access global error and its setter from context.

  if (!error) return null // If there's no error, render nothing.

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow">
      <p>{error}</p>
      <button
        className="mt-2 px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
        onClick={() => setError(null)} // Clear the error when the button is clicked.
      >
        Dismiss
      </button>
    </div>
  )
}

export default GlobalErrorNotification
