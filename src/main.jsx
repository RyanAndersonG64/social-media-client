import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'

// project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import App from './App'
import ErrorPage from './ErrorPage'
import Header from './Header'
import Footer from './Footer'
import Login from './Login'
import { AuthContext } from './context'
import { PostContext } from './postcontext'
import { ImageContext } from './imageconext'


function Layout() {


  return (
    <>
      <Header />
        <div id='page-content'>
          <Outlet />
        </div>
      <Footer />
    </>
  )
}


const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/login',
        element: <Login />
      },
    ]
  }
])

const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(undefined)
  
  const auth = {
    accessToken,
    setAccessToken,
  }

  
  
  return (
    <AuthContext.Provider value={{ auth: auth }} >
      {children}
    </AuthContext.Provider>
  )
}

const PostContextProvider = ({ children }) => {
  const [postState, setPostState] = useState([])

  return (
    <PostContext.Provider value={{ postState, setPostState }}>
      {children}
    </PostContext.Provider>
  )
}

const ImageContextProvider = ({ children }) => {
  const [imageState, setImageState] = useState([])

  return (
    <ImageContext.Provider value={{ imageState, setImageState }}>
      {children}
    </ImageContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
  <PostContextProvider>
  <ImageContextProvider>
    <RouterProvider router={router} />
  </ImageContextProvider>
  </PostContextProvider>
  </AuthContextProvider>
)
