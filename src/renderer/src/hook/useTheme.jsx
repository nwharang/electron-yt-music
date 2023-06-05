import { useLayoutEffect, useState } from 'react'

const prefersDarkSchema = window.matchMedia && window.matchMedia('(prefers-color-schema: dark)').matches
const defaultTheme = prefersDarkSchema ? 'dark' : 'light'

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || defaultTheme)

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])
  return { theme, setTheme }
}

export default useTheme
