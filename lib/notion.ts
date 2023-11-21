import {NotionAPI} from 'notion-client'
import {NOTION_PAGE_ID} from './constants'


export const notionApi = new NotionAPI()


export const getNotionRendererProps = async () => {
  const recordMap = await notionApi.getPage(NOTION_PAGE_ID || '130182f2903742f5874cb44aaceaccb7')

  return {
    recordMap,
  }
}
