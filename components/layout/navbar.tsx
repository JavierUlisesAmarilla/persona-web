'use client'

import {signIn} from 'next-auth/react'
// import {useEffect} from 'react'
import {BlueButton} from '../shared/button'
import {useSignInModal} from './sign-in-modal'
import {UserDropdown} from './user-dropdown'


export const Navbar = ({session}: {session: any}) => {
  const {SignInModal} = useSignInModal()

  // useEffect(() => {}, [session])

  return (
    <div className='w-full Navbar'>
      <SignInModal/>
      <div className='flex items-center justify-between w-full px-6 py-3 border-b border-b-border-gray'>
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
