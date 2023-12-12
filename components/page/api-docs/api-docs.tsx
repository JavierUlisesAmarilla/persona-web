'use client'

import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'react-notion-x/src/styles.css'

import {ExtendedRecordMap} from 'notion-types'
import {NotionRenderer} from 'react-notion-x'
import {NOTION_FAKE_ROOT_PAGE} from '../../../lib/constants'


export const ApiDocs = ({recordMap}: {recordMap: ExtendedRecordMap | undefined}) => {
  return recordMap ? (
    <NotionRenderer
      className='NotionRenderer'
      recordMap={recordMap}
    />
  ) : NOTION_FAKE_ROOT_PAGE ? (
    <iframe className='w-full h-screen' src={NOTION_FAKE_ROOT_PAGE} title='Api Docs'/>
  ) : (
    <div>No document.</div>
  )
}
