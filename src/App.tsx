import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './app/routes'
import Header from './components/Header'
import ErrorBoundary from './components/ErrorBoundary'
import { GlobalErrorProvider } from './context/GlobalErrorContext'
import GlobalErrorNotification from './components/GlobalErrorNotification'

function App() {
  return (
    <ErrorBoundary>
      <GlobalErrorProvider>
        <Router>
          <Header />
          <GlobalErrorNotification />
          <AppRoutes />
        </Router>
      </GlobalErrorProvider>
    </ErrorBoundary>
  )
}

export default App
