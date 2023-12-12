'use client'

import {BlueButton} from '../shared/button'
import {UserDropdown} from './user-dropdown'
// import {useEffect} from 'react'
import Link from 'next/link'
import {useSignInModal} from './sign-in-modal'


export const Navbar = ({session}: {session: any}) => {
  const {SignInModal} = useSignInModal()

  // useEffect(() => {}, [session])

  return (
    <div className='w-full h-full Navbar'>
      <SignInModal/>
      <div className='flex items-center justify-between w-full h-full px-6'>
        <div className='text-2xl font-semibold'>Persona [BETA]</div>
        <div>
          {session ? (
            <UserDropdown session={session}/>
          ) : (
            <Link passHref href='/auth/sign-in' legacyBehavior>
              <BlueButton >
                Sign In
              </BlueButton>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
