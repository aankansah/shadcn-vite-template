import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Phone, Building2 } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import loyaltyBackgroundTransparent from '@/assets/loyalty-background-transparent.svg'

interface BranchesModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Branch {
  name: string
  address: string[]
  phone?: string[]
  isHeadOffice?: boolean
}

const branches: Branch[] = [
  {
    name: "Head Office",
    address: [
      "Loyalty Insurance Company Ltd.",
      "No.3,Justice A. Brobbey Avenue Mile 7",
      "Achimota – Accra, Ghana GW-1056-6962"
    ],
    isHeadOffice: true
  },
  {
    name: "Tema",
    address: [
      "NACO Fashion Building",
      "Community E (Old Adorn FM Building)"
    ],
    phone: ["030-320-9824", "050-155-5203"]
  },
  {
    name: "Dansoman",
    address: [
      "2020 Wesley Grammar Road,",
      "Along The Methodist University Road Akokor Foto"
    ],
    phone: ["030-232-7281", "050-155-5204"]
  },
  {
    name: "Kasoa",
    address: [
      "Ground Floor MIC Plaza,",
      "Winneba – Accra Road.",
      "Ngleshie Amanfrom"
    ],
    phone: ["030-830-0387"]
  },
  {
    name: "Kumasi",
    address: [
      "IPT Junction Asuoyeboah,",
      "Frimps Oil Service Station."
    ],
    phone: ["032-219-2642", "020-181-8056"]
  },
  {
    name: "Sunyani",
    address: [
      "F2/2 Area 4,",
      "Madcourt Pharmacy Building."
    ],
    phone: ["035-202-0630", "050-167-3431"]
  },
  {
    name: "Across Ghana",
    address: [
      "All DVLA Offices",
      "All Frimps Oil Fuel Stations"
    ],
    phone: ["030-978-389"]
  }
]

export default function BranchesModal({ isOpen, onClose }: BranchesModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8
            }}
          >
            <div className={cn(
              'relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl',
              'bg-linear-to-br from-blue-100 via-purple-100 to-indigo-200',
              'border border-blue-200/50 shadow-2xl backdrop-blur-sm'
            )}>
              
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
                className="absolute z-10 bottom-0 right-0 w-[400px] h-[400px] pointer-events-none opacity-30"
              />

              {/* Header */}
              <div className="relative z-20 p-6 pb-4 border-b border-blue-200/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">Our Branches</h2>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-slate-600">Find us across Ghana</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-slate-600 hover:text-slate-800 hover:bg-white/50"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-20 p-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {branches.map((branch, index) => (
                    <motion.div
                      key={branch.name}
                      className={cn(
                        'bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm',
                        branch.isHeadOffice && 'ring-2 ring-blue-500/50 bg-blue-50/70'
                      )}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1',
                          branch.isHeadOffice 
                            ? 'bg-linear-to-br from-blue-500 to-purple-600' 
                            : 'bg-linear-to-br from-slate-400 to-slate-600'
                        )}>
                          {branch.isHeadOffice ? (
                            <Building2 className="w-4 h-4 text-white" />
                          ) : (
                            <MapPin className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className={cn(
                            'font-semibold mb-2',
                            branch.isHeadOffice ? 'text-blue-800' : 'text-slate-800'
                          )}>
                            {branch.name}
                            {branch.isHeadOffice && (
                              <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                                HQ
                              </span>
                            )}
                          </h3>
                          <div className="space-y-1 mb-3">
                            {branch.address.map((line, idx) => (
                              <p key={idx} className="text-sm text-slate-600">
                                {line}
                              </p>
                            ))}
                          </div>
                          {branch.phone && (
                            <div className="flex flex-wrap gap-2">
                              {branch.phone.map((phone, idx) => (
                                <a
                                  key={idx}
                                  href={`tel:${phone}`}
                                  className="inline-flex items-center gap-1 text-xs bg-green-500/90 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition-colors"
                                >
                                  <Phone className="w-3 h-3" />
                                  {phone}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-20 p-6 pt-4 border-t border-blue-200/30">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    <p>Visit any of our branches for personalized service</p>
                  </div>
                  <Button
                    onClick={onClose}
                    className="bg-linear-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                  >
                    Close
                  </Button>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}