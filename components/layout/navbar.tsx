/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client'

import {NOTION_ROOT_PAGE, USE_REAL_NOTION} from '../../lib/constants'

import {MENUS} from '@/lib/constants'
import {useScroll} from '@/lib/hooks/use-scroll'
import {useZustand} from '@/lib/store/use-zustand'
import classnames from 'classnames'
import {signIn} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import {useEffect} from 'react'
import {BlueButton} from '../shared/button'
import {useSignInModal} from './sign-in-modal'
import {UserDropdown} from './user-dropdown'


export const NavBar = ({session}: {session: any}) => {
  // eslint-disable-next-line no-unused-vars
  const {SignInModal, setShowSignInModal} = useSignInModal()
  const scrolled = useScroll(50)
  const {selMenu, setSelMenu, status} = useZustand()

  useEffect(() => {
    console.log('NavBar#useEffect: session: ', session)
  }, [session])

  return (
    <>
      <SignInModal/>
      <div
        className={`fixed top-0 w-full flex justify-center ${scrolled ?
          'border-b border-gray-200 bg-white/50 backdrop-blur-xl' :
          'bg-white/0'
        } z-30 transition-all`}
      >
        <div className="flex items-center justify-between w-full h-16 mx-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center text-2xl font-display">
              <Image
                src="/persona-logo-rounded-large.png"
                alt="Persona logo"
                width="30"
                height="30"
                className="mr-2 rounded-sm"
              />
              <p>Persona</p>
            </Link>
            {session && Object.keys(MENUS).map((menuKey) =>
              <div
                key={menuKey}
                className={classnames({
                  'text-xl cursor-pointer hover:text-black': true,
                  'text-text-dark': selMenu === menuKey,
                  'text-text-gray': selMenu !== menuKey,
                })}
                onClick={() => {
                  if (status) {
                    return
                  }

                  if (menuKey === 'docs' && USE_REAL_NOTION && NOTION_ROOT_PAGE) {
                    window.location.href = NOTION_ROOT_PAGE
                    return
                  }

                  setSelMenu(menuKey)
                }}
              >
                {MENUS[menuKey]}
              </div>,
            )}
          </div>
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
    </>
  )
}
