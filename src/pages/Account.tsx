import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Phone, FileText, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

// Dummy user data matching the mobile app design
const userData = {
  name: 'De-graft Amoateng',
  email: 'de-graft@gmail.com',
  phone: '0577865882',
  policiesCount: 2,
  avatar: 'DA' // Initials for avatar
}

export default function Account() {
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    // Simulate logout process
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="relative bg-white border-b border-slate-200">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Button>
          
          <h1 className="text-lg font-semibold text-slate-900">My Profile</h1>

          <div/>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white shadow-sm border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {userData.avatar}
                    </span>
                  </div>
                  
                  {/* User Info */}
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold text-slate-900">
                      {userData.name}
                    </h2>
                    <p className="text-sm text-slate-600">
                      {userData.email}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          {/* Phone Number */}
          <Card className="bg-white shadow-sm border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500">Phone Number</p>
                  <p className="text-base font-medium text-slate-900">
                    {userData.phone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Number of Policies */}
          <Card className="bg-white shadow-sm border-slate-200">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500">Number Of Policies Linked</p>
                  <p className="text-base font-medium text-slate-900">
                    {userData.policiesCount}
                  </p>
                </div>
              </div>

               {/* Edit Button */}
                <Link
                  to={"/my-policies"}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  View Policies
                </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pt-8"
        >
          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={cn(
              "w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 py-3 rounded-lg font-medium transition-colors",
              isLoggingOut && "opacity-50 cursor-not-allowed"
            )}
            variant="outline"
          >
            <LogOut className="h-5 w-5 mr-2" />
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}