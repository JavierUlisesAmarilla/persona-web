import {NotionAPI} from 'notion-client'
import {NOTION_ROOT_PAGE_ID} from './constants'


export const notionApi = new NotionAPI()


export const getNotionPage = async (pageId: string | undefined = undefined) => {
  const recordMap = await notionApi.getPage(pageId || NOTION_ROOT_PAGE_ID)

  return {
    recordMap,
  }
}
