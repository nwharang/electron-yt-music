import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'

import MainLayout from '@/layouts/MainLayout'
import AuthLayout from '@/layouts/AuthLayout'

import Index from './pages'
import Music from './pages/music'
import ErrorPage from './pages/error'
import LoginPage from './pages/auth/login'
import RegisterPage from './pages/auth/register'

import Invoke from '@/helper/Invoke'
import Logo from '@/assets/logo.png'

import useTheme from '@/hook/useTheme'
import Loading from '@/components/Loading'

export default function App() {
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const [Path, setPath] = useState(null)
  useEffect(() => {
    Invoke('path').then((data) => setPath(data))
  }, [])
  if (!Path) return <Loading />
  return (
    <ClerkProvider
      publishableKey={import.meta.env.RENDERER_VITE_CLERK_REACT}
      navigate={(to) => navigate(to)}
      afterSignInUrl={Path}
      afterSignUpUrl={Path}
      appearance={{
        baseTheme: theme == 'light' ? null : dark,
        layout: {
          logoImageUrl: Logo,
          logoPlacement: 'inside',
          showOptionalFields: true,
          socialButtonsPlacement: 'bottom',
          socialButtonsVariant: 'blockButton'
        },
        elements: {
          card: 'dark:bg-slate-800'
        }
      }}
    >
      <Routes>
        <Route path="/auth" element={<AuthLayout theme={theme} setTheme={setTheme} errorElement={<ErrorPage />} />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>
        <Route path="/" element={<MainLayout theme={theme} setTheme={setTheme} errorElement={<ErrorPage />} />}>
          <Route index element={<Index />} />
          <Route path="music" element={<Music />}>
            <Route path=":id" />
          </Route>
        </Route>
      </Routes>
    </ClerkProvider>
  )
}
