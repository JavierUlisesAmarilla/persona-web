import 'tailwindcss/tailwind.css'

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable require-jsdoc */
/* eslint-disable jsdoc/require-jsdoc */
import {getProviders, signIn} from 'next-auth/react'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {SiAuth0} from 'react-icons/si'


export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}


export default function SignIn({providers}: {providers: any}) {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div className='flex flex-col gap-6 p-16 border rounded-lg bg-bg-gray border-border-gray'>
        <div className='text-2xl font-semibold'>Login to Sindarin</div>
        <div className='flex flex-col gap-3'>
          {Object.keys(providers).map((providerId, providerIndex) =>
            <div
              key={providerIndex}
              className='flex items-center gap-3 p-3 border rounded-lg cursor-pointer bg-bg-light border-border-gray hover:text-text-blue'
              onClick={() => signIn(providerId)}
            >
              {providerId === 'auth0' && <SiAuth0 className='text-lg'/>}
              {providerId === 'google' && <AiFillGoogleCircle className='text-lg'/>}
              <div className='font-medium'>Login with {providers[providerId].name}</div>
            </div>,
          )}
        </div>
      </div>
    </div>
  )
}
