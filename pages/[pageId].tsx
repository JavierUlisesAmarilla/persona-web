/* eslint-disable require-jsdoc */
/* eslint-disable jsdoc/require-jsdoc */
import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'react-notion-x/src/styles.css'

import {IS_DEV, NOTION_ROOT_PAGE_ID, NOTION_ROOT_SPACE_ID} from '../lib/constants'

import {ExtendedRecordMap} from 'notion-types'
import {getAllPagesInSpace} from 'notion-utils'
import {defaultMapPageUrl} from 'react-notion-x'
import {NotionPage} from '../components/page/NotionPage'
import {notionApi} from '../lib/notion'


export const getStaticProps = async (context: any) => {
  const pageId = context.params.pageId as string
  const recordMap = await notionApi.getPage(pageId)

  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  }
}


export async function getStaticPaths() {
  if (IS_DEV) {
    return {
      paths: [],
      fallback: true,
    }
  }

  const mapPageUrl = defaultMapPageUrl(NOTION_ROOT_PAGE_ID)
  const pages = await getAllPagesInSpace(
      NOTION_ROOT_PAGE_ID,
      NOTION_ROOT_SPACE_ID,
      notionApi.getPage,
      {
        traverseCollections: false,
      },
  )
  const paths = Object.keys(pages)
      .map((pageId) => mapPageUrl(pageId))
      .filter((path) => path && path !== '/')
  return {
    paths,
    fallback: true,
  }
}


export default function Page({recordMap}: {recordMap: ExtendedRecordMap}) {
  return (
    <NotionPage recordMap={recordMap}/>
  )
}
