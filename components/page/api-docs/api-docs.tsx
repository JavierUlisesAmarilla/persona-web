'use client'

import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'react-notion-x/src/styles.css'

// import {ExtendedRecordMap} from 'notion-types'
// import {NotionRenderer} from 'react-notion-x'
import {NOTION_ROOT_PAGE} from '../../../lib/constants'


export const ApiDocs = (
    // {recordMap}: {recordMap: ExtendedRecordMap},
) => {
  return (
    // <NotionRenderer
    //   className='NotionRenderer'
    //   recordMap={recordMap}
    // />
    <iframe src={NOTION_ROOT_PAGE} className='w-full h-screen' title='Api Docs'/>
  )
}
