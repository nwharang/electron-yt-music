import Theme from '@/components/Theme'
import Toolbar from '@/components/Toolbar'
import Loading from '@/components/Loading'
import { SignedIn, useUser } from '@clerk/clerk-react'
import { useEffect, useState, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '@/components/SideBar'
import SettingPanel from '@/components/SettingPanel'
import MusicControl from '@/components/MusicControl'

const MainLayout = ({ theme, setTheme }) => {
  const navigate = useNavigate()
  const { isSignedIn, user, isLoaded } = useUser()
  const [OpenSeting, setOpenSeting] = useState(false)
  const [PlayingSong, setPlayingSong] = useState(null)

  useEffect(() => {
    if (isLoaded && !isSignedIn) navigate('/auth/login')
  }, [isSignedIn, isLoaded])

  if (!isLoaded) return <Loading />
  return (
    <>
      <SignedIn>
        <Theme theme={theme} setTheme={setTheme} />
        <Toolbar />
        <main className="relative flex h-[calc(100vh-2rem)] w-full items-center justify-center">
          <div className="relative text-dark flex w-full h-full overflow-hidden bg-white/30 shadow-2xl backdrop-blur-[2px] dark:bg-black/90 dark:text-white">
            <SettingPanel OpenSeting={OpenSeting} setOpenSeting={setOpenSeting} />
            <SideBar OpenSeting={OpenSeting} setOpenSeting={setOpenSeting} theme={theme} />
            <div className="w-full flex flex-col h-full justify-end dark:bg-gray-800 bg-gray-200 scroll-smooth scrollbar-rounded-lg scrollbar-thin  scrollbar-thumb-black/50 dark:scrollbar-thumb-white/50">
              <Outlet context={[PlayingSong, setPlayingSong]} />
              <MusicControl PlayingSong={PlayingSong} />
            </div>
          </div>
        </main>
      </SignedIn>
    </>
  )
}

export default MainLayout
