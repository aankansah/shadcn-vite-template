import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import loyaltyBackgroundTransparent from '@/assets/loyalty-background-transparent.svg'
import { ListTodo, Search, FileText } from 'lucide-react'
import PolicySearchModal from './PolicySearchModal'

interface PolicyDashboardCardProps {
  title: string
  className?: string
}

export default function PolicyDashboardCard({ 
  title, 
  className
}: PolicyDashboardCardProps) {
  const navigate = useNavigate()
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  return (
    <>
    <motion.div 
      className={cn(
        'relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-100 via-purple-100 to-indigo-200 border border-blue-200/50 shadow-2xl',
        'backdrop-blur-sm',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }}
    >
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-4 left-4 w-32 h-32 bg-blue-300/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-4 right-4 w-24 h-24 bg-purple-300/30 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Background Icon */}
      <img 
        src={loyaltyBackgroundTransparent} 
        alt="" 
        className="absolute z-10 bottom-0 right-0 w-[800px] h-[800px] pointer-events-none"
      />

      {/* Header with Icon */}
      <div className="relative z-20 p-6 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-1">
              {title}
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600">Live Dashboard</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="relative z-20 px-6 pb-6">
        <div className='space-y-4'>
          {/* Policy Stats */}
          <div className='flex items-center justify-between'>
            <div className='flex flex-wrap gap-2'>
              <div className='bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm'>
                <div className='w-2 h-2 bg-slate-500 rounded-full'></div>
                2 Total Policies
              </div>
              <div className='bg-red-500/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm'>
                <div className='w-2 h-2 bg-white rounded-full animate-pulse'></div>
                2 Need Renewal
              </div>
              <div className='bg-green-500/90 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm'>
                <div className='w-2 h-2 bg-white rounded-full'></div>
                0 Active
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className='flex flex-wrap gap-3 pt-2'>
            <Button 
              onClick={() => navigate('/my-policies')} 
              size='lg' 
              variant="secondary" 
              className='bg-gradient text-white flex-1'
            >
              <ListTodo className="w-4 h-4" />
              View All Policies
            </Button>
            <Button 
              onClick={() => navigate('/my-claims')} 
              size='lg' 
              variant="secondary" 
              className='bg-gradient text-white flex-1'
            >
              <FileText className="w-4 h-4" />
              View All Claims
            </Button>
            <Button 
              onClick={() => setIsSearchModalOpen(true)}
              size='lg' 
              variant="secondary" 
              className='bg-gradient text-white  flex-1 '
            >
              <Search className="w-4 h-4" />
              Search Policy
            </Button>
          </div>

          {/* Renewal Alert */}
          <div className='bg-red-500/20 border border-red-400/40 rounded-lg p-3 mt-4'>
            <div className='flex items-center gap-2 text-red-800'>
              <span className='text-lg'>⚠️</span>
              <div>
                <p className='text-sm font-medium'>Renewal Required</p>
                <p className='text-xs text-red-700/80'>You have 2 policies expiring soon. Renew now to avoid coverage gaps.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </motion.div>
    
    {/* Policy Search Modal */}
    <PolicySearchModal
      isOpen={isSearchModalOpen}
      onClose={() => setIsSearchModalOpen(false)}
    />
  </>
  )
}