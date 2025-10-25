export default function Contact() {
  return (
    <div className='flex items-center justify-center h-screen w-screen gap-4 flex-col'>  
      <h1 className='text-green-600 font-bold text-4xl'>Contact Page</h1>
      <p className='text-gray-600 max-w-md text-center'>
        Get in touch with our team for any questions about our insurance services 
        or loyalty programs.
      </p>
      <div className='text-sm text-gray-500'>
        <p>Email: contact@loyalty-insurance.com</p>
        <p>Phone: (555) 123-4567</p>
      </div>
    </div>
  )
}