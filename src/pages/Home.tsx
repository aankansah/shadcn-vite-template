import reactLogo from '../assets/react.svg'

export default function Home() {
  return (
    <div className='flex items-center justify-center h-screen w-screen gap-4 flex-col'>  
      <img src={reactLogo} alt="react logo" className='h-20 w-20' />
      <h1 className='text-red-600 font-bold text-4xl'>Home Page</h1>
      <p className='text-gray-600'>Welcome to the Loyalty E-Insurance Platform</p>
    </div>
  )
}