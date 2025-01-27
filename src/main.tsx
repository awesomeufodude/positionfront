import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { store } from './app/store'
import App from './App'
import './index.css'
import {Toaster} from "react-hot-toast"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Toaster/>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
