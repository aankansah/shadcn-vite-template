import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import loyaltyBackgroundTransparent from '@/assets/loyalty-background.svg'
import { cn } from '@/lib/utils'

interface LoyaltyBrandedCardProps {
  title: string
  description?: string
  children?: ReactNode
  className?: string
  variant?: 'default' | 'large'
  onClick?: () => void
  animated?: boolean
}

export default function LoyaltyBrandedCard({ 
  title, 
  description, 
  children, 
  className,
  variant = 'default',
  onClick,
  animated = false
}: LoyaltyBrandedCardProps) {
  return (
    <motion.div 
      className={cn(
        'relative overflow-hidden rounded-3xl bg-gradient text-white cursor-pointer',
        variant === 'large' ? 'p-6 py-8 min-h-[200px]' : 'p-4 py-6 min-h-[160px]',
        className
      )}
      onClick={onClick}
      initial={{ scale: 1 }}
      whileHover={animated ? { scale: 1.05 } : {}}
      whileTap={animated ? { scale: 0.98 } : {}}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
        mass: 0.8
      }}
    >
      {/* Background Icon */}
      <img 
        src={loyaltyBackgroundTransparent} 
        alt="" 
        className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none"
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className={cn({
          "flex flex-col gap-6 h-full": !children
        })}>
          <h3 className={cn(
            'font-semibold mb-2',
            variant === 'large' ? 'text-2xl' : 'text-xl'
          )}>
            {title}
          </h3>
          {description && (
            <p className={cn(
              'text-white/90 leading-relaxed',
              variant === 'large' ? 'text-lg' : 'text-base'
            )}>
              {description}
            </p>
          )}
        </div>
        
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  )
}