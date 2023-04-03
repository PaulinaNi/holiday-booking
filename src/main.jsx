import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

//pages and root layout
import Root from './layout/root'
import Homepage from './pages/homepage/homepage.page'
import Hr from './pages/hr/hr.page'

//routes for our app
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "/hr",
        element: <Hr />,
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)