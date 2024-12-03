import { Link } from 'react-router-dom'
import { HiMiniBars3CenterLeft } from 'react-icons/hi2'
import { IoSearchOutline } from 'react-icons/io5'
import { HiOutlineUser, HiOutlineHeart, HiOutlineShoppingCart } from 'react-icons/hi'

import avatarImg from '../assets/avatar.png'
import { useState } from 'react'
import { useAppSelector } from '../redux/hooks'
import { useAuth } from '../context/AuthContext'

const navigation = [
  {
    name: 'Dashboard',
    href:'/dashboard'
  },
  {
    name: 'Orders',
    href:'/orders'
  },
  {
    name: 'Cart Page',
    href:'/cart'
  },
  {
    name: 'Check Out',
    href:'/checkout'
  },
]

const Navbar = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { currentUser, logout } = useAuth()

  const cartItems = useAppSelector(state => state.cart.cartItems)

  const handleLogOut = () => {
    if(logout) logout()
    else console.log(222);
  }

  return (
    <header className='max-w-screen-2xl mx-auto px-4 py-6'>
      <nav className='flex justify-between items-center'>
        {/* Left Side */}
        <div className='flex items-center md:gap-16 gap-4'>
          <Link to='/'>
            <HiMiniBars3CenterLeft className='size-6'/>
          </Link>

          {/* Search Input */}
          <div className='flex relative sm:w-72 w-40 space-x-1'>
            <IoSearchOutline className='absolute left-3 inline-block inset-y-2'/>
            <input type='text' placeholder='Search here' className='bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none'/>
          </div>
        </div>

        {/* Right Side */}
        <div className='flex relative items-center md:space-x-3 space-x-2'>
          <div>
            { currentUser ? 
                <>
                  <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} /*onBlur={() => setIsDropdownOpen(false)}*/>
                    <img src={avatarImg} alt='avatar-img' className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`}/>
                  </button>
                  {
                    isDropdownOpen && 
                      <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                        <ul className='py-2'>
                          {
                            navigation.map((item) => (
                              <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>
                                  {item.name}
                                </Link>
                              </li>
                            ))
                          }
                          <li>
                            <button onClick={handleLogOut} className='block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left'>Logout</button>
                          </li>
                        </ul>
                      </div>
                  }
                </> : <Link to='/login'><HiOutlineUser className='size-6'/></Link>}
          </div>
          <button className='hidden sm:block'>
            <HiOutlineHeart className='size-6'/>
          </button>
          <Link to='/cart' className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-md'>
            <HiOutlineShoppingCart className='size-6'/>
            {
              cartItems.length ? <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span>
              : <span className='text-sm font-semibold sm:ml-1'>0</span>
            }
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar