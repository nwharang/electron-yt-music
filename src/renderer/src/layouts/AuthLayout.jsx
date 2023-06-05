import Theme from '@/components/Theme'
import Toolbar from '@/components/Toolbar'
import Loading from '@/components/Loading'
import { SignedOut, useUser, SignIn } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthLayout = ({ theme, setTheme }) => {
  const navigate = useNavigate()
  const { isSignedIn, user, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded && isSignedIn) navigate('/')
  }, [isSignedIn, isLoaded])

  if (!isLoaded) return <Loading />
  return (
    <>
      <SignedOut>
        <Theme theme={theme} setTheme={setTheme} />
        <Toolbar />
        <main className="relative flex h-[calc(100vh-2rem)] w-full flex-col items-center justify-center">
          <div className="text-dark relative mx-auto h-full w-full overflow-hidden bg-white/30 shadow-2xl backdrop-blur-[2px] dark:bg-black/90 dark:text-white flex justify-center items-center">
            <Outlet />
          </div>
        </main>
      </SignedOut>
    </>
  )
}

export default AuthLayout
