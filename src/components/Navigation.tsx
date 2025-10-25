import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ]
  
  return (
    <nav className='fixed top-0 left-0 right-0 bg-white shadow-md z-10'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center space-x-8'>
            <Link to="/" className='text-xl font-bold text-gray-800'>
              Loyalty Insurance
            </Link>
            <div className='flex space-x-6'>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}