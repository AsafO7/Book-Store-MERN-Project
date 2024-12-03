import { createBrowserRouter } from 'react-router-dom'
import App from '../App.js'
import Home from '../pages/home/Home.tsx'
import Login from '../components/Login.tsx'
import Register from '../components/Register.tsx'
import Cart from '../pages/books/Cart.tsx'
import Checkout from '../pages/books/Checkout.tsx'
import SingleBook from '../pages/books/SingleBook.tsx'
import PrivateRoute from './PrivateRoute.tsx'
import OrderPage from '../pages/books/OrderPage.tsx'
import AdminRoute from './AdminRoute.tsx'
import AdminLogin from '../components/AdminLogin.tsx'
import DashboardLayout from '../pages/dashboard/DashboardLayout.tsx'
import Dashboard from '../pages/dashboard/Dashboard.tsx'
import ManageBooks from '../pages/dashboard/manageBooks/ManageBooks.tsx'
import AddBook from '../pages/dashboard/addBook/AddBook.tsx'
import UpdateBook from '../pages/dashboard/editBook/UpdateBook.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/orders',
        element: <PrivateRoute><OrderPage /></PrivateRoute>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/checkout',
        element: <PrivateRoute><Checkout /></PrivateRoute>
      },
      {
        path: '/books/:id',
        element: <SingleBook />
      },
      {
        path: '/admin',
        element: <AdminLogin />
      },
      {
        path: '/dashboard',
        element: <AdminRoute>
          <DashboardLayout />
        </AdminRoute>,
        children: [
          {
            path: "",
            element: <AdminRoute>
              <Dashboard />
            </AdminRoute>
          },
          {
            path: 'add-new-book',
            element: <AdminRoute>
              <AddBook />
            </AdminRoute>,
          },
          {
            path: 'edit-book/:id',
            element: <AdminRoute>
              <UpdateBook />
            </AdminRoute>,
          },
          {
            path: 'manage-books',
            element: <AdminRoute>
              <ManageBooks />
            </AdminRoute>,
          },
        ]
      },
    ]
  }
])

export default router