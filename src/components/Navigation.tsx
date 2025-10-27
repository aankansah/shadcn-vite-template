import { Link, useNavigate } from 'react-router-dom'
import logo from '@/assets/loyalty-logo.svg'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

export default function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored authentication data if needed
    // localStorage.removeItem('token'); // Uncomment if you store auth tokens
    // sessionStorage.clear(); // Uncomment if you use session storage
    
    // Navigate to login page
    navigate('/login');
  };
  return (
    <nav className={cn('relative z-20 border-b h-(--navbar-height)')}>
      <div className='mx-auto px-4 lg:px-8 h-full'>
        <div className='flex items-center justify-between h-full'>
          <Link to="/" className='flex items-center gap-2 bg-gray-100 px-4 py-1 rounded-full'>
            <img src={logo} alt="Loyalty Insurance logo" className='h-14 w-auto' />
          </Link>
          <Button
            type="button"
            size='lg'
            className='px-4 py-2 rounded-md text-sm font-medium'
            color='destructive'
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}