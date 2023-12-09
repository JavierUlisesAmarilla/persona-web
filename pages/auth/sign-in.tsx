/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable require-jsdoc */
/* eslint-disable jsdoc/require-jsdoc */
import {getProviders, signIn} from 'next-auth/react'


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
    <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%', border: '1px solid red'}}>
      <div>Login to Sindarin</div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {Object.keys(providers).map((providerId, providerIndex) =>
          <div
            key={providerIndex}
            style={{cursor: 'pointer'}}
            onClick={() => signIn(providerId)}
          >
            {providers[providerId].name}
          </div>,
        )}
      </div>
    </div>
  )
}
