import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import BottomNavigation from './BottomNavigation'
import loyaltyBackgroundTransparent from '../assets/loyalty-background-transparent.svg'


export default function Layout() {
  return (
    <div className='w-screen overflow-hidden bg-violet-50 h-(--app-height)'>
      <div className='container mx-auto bg-white relative'>
        <Navigation />

        <main className='relative h-(--main-height) z-20'>
          <Outlet />
        </main>

        <BottomNavigation />

        {/* Design Element */}
        <img src={loyaltyBackgroundTransparent} alt="design element" className='z-0 absolute bottom-0 right-0 h-[1000px] w-[1000px]' />
      </div>
    </div>
  )
}