import React from 'react'
import { SignIn } from '@clerk/clerk-react'

const Login = () => {
  return (
    <>
      <SignIn signUpUrl="/auth/register" />
    </>
  )
}

export default Login
