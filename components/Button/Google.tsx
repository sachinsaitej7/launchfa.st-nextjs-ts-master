import React from 'react'
import IconGoogle from '../Icons/Google'
import { signIn } from 'next-auth/react'

const SignInWithGoogle = () => {
  return (
    <button
      onClick={() => {
        signIn('google')
      }}
      type="button"
      className="flex h-10 items-center gap-x-2 rounded-md border px-12 transition duration-300 hover:border-black"
    >
      <IconGoogle />
      <p>Continue with Google</p>
    </button>
  )
}

export default SignInWithGoogle
