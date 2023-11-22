/* eslint-disable require-jsdoc */
/* eslint-disable jsdoc/require-jsdoc */
'use client'

import {ExtendedRecordMap} from 'notion-types'
import {NotionPage} from '../../components/page/NotionPage'
import {getNotionPage} from '../../lib/notion'


export const getStaticProps = async () => {
  const {recordMap} = await getNotionPage()

  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  }
}


export default function ApiDocs({recordMap}: { recordMap: ExtendedRecordMap }) {
  return (
    <NotionPage recordMap={recordMap}/>
  )
}
