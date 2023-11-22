/* eslint-disable require-jsdoc */
/* eslint-disable jsdoc/require-jsdoc */
import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'react-notion-x/src/styles.css'


export default function App({Component, pageProps}: {Component: any, pageProps: any}) {
  return <Component {...pageProps}/>
}
