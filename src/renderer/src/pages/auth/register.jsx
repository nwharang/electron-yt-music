import React from 'react'
import { SignUp } from '@clerk/clerk-react'

const Login = () => {
  return (
    <>
      <SignUp signInUrl="/auth/login" />
    </>
  )
}

export default Login
