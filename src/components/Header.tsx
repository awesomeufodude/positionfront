import { FC } from 'react'
import { Button } from './ui/button'
import { logout } from '@/features/auth/redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/store'
import Logo from '../../public/vite.svg'

const Header: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  // Handle user logout: clear token, dispatch logout action, and redirect to login page.
  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 sm:h-20">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 border-b">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo and App Name */}
          <a href="/" className="flex items-center">
            <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Article Nexus</span>
          </a>

          {/* Log Out Button */}
          <div className="flex items-center lg:order-2">
            {isAuthenticated && <Button onClick={handleLogout}>Log Out</Button>}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
