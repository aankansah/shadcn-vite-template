import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='flex items-center justify-center h-screen w-screen gap-4 flex-col'>  
      <h1 className='text-red-600 font-bold text-6xl'>404</h1>
      <h2 className='text-gray-800 font-semibold text-2xl'>Page Not Found</h2>
      <p className='text-gray-600 max-w-md text-center'>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
      >
        Go Home
      </Link>
    </div>
  )
}