import { Link, useLocation } from 'react-router-dom'
import wave from '@/assets/wave.svg'
import home from '@/assets/home.svg'
import homeActive from '@/assets/home-active.svg'
import userIcon from '@/assets/user.png'
import userIconActive from '@/assets/user-active.png'
import search from '@/assets/search.svg'
import searchActive from '@/assets/search-active.svg'
import selector from '@/assets/bottom-navigation-selector.svg'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function BottomNavigation() {
  const location = useLocation()

  const items = [
    { path: '/', label: 'Home', icon: {
      active: homeActive,
      inactive: home,
    } },
    { path: '/policies', label: 'Policies', icon: {
      active: searchActive,
      inactive: search,
    } },
    { path: '/account', label: 'Account', icon: {
      active: userIconActive,
      inactive: userIcon,
    } },
  ]

  return (
    <footer className='relative h-(--footer-height) mx-auto z-10'>
      <img src={wave} alt='Wave background' className='absolute inset-x-0 top-2 sm:top-0 lg:-top-5 2xl:-top-10 w-full pointer-events-none select-none' />
      {/* // Intentional: Do not remove */}
      <img src={wave} alt='Wave background' className='md:hidden absolute inset-x-0 top-14 w-full pointer-events-none select-none' />
      
      <div className='w-3/5 mx-auto h-full absolute z-10 inset-0 flex items-center justify-between gap-12'>
        {items.map((item) => {
          const active = location.pathname === item.path
          return (
            <Link key={item.path} to={item.path} className='w-28 relative flex flex-col items-center justify-center gap-2 h-full'>
              <img src={active ? item.icon.active: item.icon.inactive} alt={item.label} className={cn('relative z-10 size-8', {
                'size-8' : active,
                'text-white': !active
              })} />
              <span className={cn('relative z-10 text-xs', {
                'bg-linear-to-tr from-[#794f9f] to-[#426cb3] bg-clip-text text-transparent': active,
                'text-white/80': !active
              })}>
                {item.label}
              </span>
              {active && (
                <motion.img
                  layoutId='bottom-nav-selector'
                  src={selector}
                  alt=''
                  className='absolute left-1/2 -translate-x-1/2 w-full h-full pointer-events-none select-none'
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 45 }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </footer>
  )
}