import React, { createContext, useContext, useState } from 'react'

// Define the shape of the context for global error handling.
interface GlobalErrorContextProps {
  error: string | null // Holds the current error message or null if no error exists.
  setError: (error: string | null) => void // Function to update the error state.
}

// Create a context with the defined shape. Default value is undefined.
const GlobalErrorContext = createContext<GlobalErrorContextProps | undefined>(undefined)

// Provider component to manage the global error state.
export const GlobalErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null) // State to track the current error.

  return <GlobalErrorContext.Provider value={{ error, setError }}>{children}</GlobalErrorContext.Provider>
}

// Hook to access the global error context.
export const useGlobalError = () => {
  const context = useContext(GlobalErrorContext) // Get the context value.
  if (!context) {
    // Throw an error if the hook is used outside the provider.
    throw new Error('useGlobalError must be used within a GlobalErrorProvider')
  }
  return context
}
