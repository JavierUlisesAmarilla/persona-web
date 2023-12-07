'use client'

import {BlueButton} from '../shared/button'
import {UserDropdown} from './user-dropdown'
// import {useEffect} from 'react'
import {signIn} from 'next-auth/react'
import {useSignInModal} from './sign-in-modal'


export const Navbar = ({session}: {session: any}) => {
  const {SignInModal} = useSignInModal()

  // useEffect(() => {}, [session])

  return (
    <div className='w-full h-full Navbar'>
      <SignInModal/>
      <div className='flex items-center justify-between w-full h-full px-6'>
        <div className='text-2xl font-semibold'>Persona</div>
        <div>
          {session ? (
            <UserDropdown session={session}/>
          ) : (
            <BlueButton
              onClick={(e) => {
                e.preventDefault()
                signIn()
              }}
            >
              Sign In
            </BlueButton>
          )}
        </div>
      </div>
    </div>
  )
}
