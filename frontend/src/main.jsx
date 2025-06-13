// Import the necessary modules and components
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router.jsx'
import  'sweetalert2/dist/sweetalert2.js'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { SearchProvider } from './context/SearchContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Toaster position="top-center" reverseOrder={true} />
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  </Provider>,
)