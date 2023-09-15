"use client"

import { getAllData, removeData, saveData } from "@/lib/mongo-db"
import { useEffect, useState } from "react"


let isFirstRender = true


export default function ApiKeyAssign() {
  const [dataArr, setDataArr] = useState<Array<any>>([])

  const onAdd = () => {
    // console.log('ApiKeyAssign#onAdd')
    setDataArr([...dataArr, {}])
  }

  const onEmailChange = (dataIndex: number, email: string) => {
    // console.log('ApiKeyAssign#onEmailChange: dataIndex: ', dataIndex)
    // console.log('ApiKeyAssign#onEmailChange: email: ', email)
    dataArr[dataIndex].email = email
    setDataArr(dataArr)
  }

  const onApiKeyChange = (dataIndex: number, apiKey: string) => {
    // console.log('ApiKeyAssign#onApiKeyChange: dataIndex: ', dataIndex)
    // console.log('ApiKeyAssign#onApiKeyChange: apiKey: ', apiKey)
    dataArr[dataIndex].apiKey = apiKey
    setDataArr(dataArr)
  }

  const onSave = () => {
    console.log('ApiKeyAssign#onSave: dataArr: ', dataArr)
    dataArr.forEach((data) => saveData(data))
  }

  const onRemove = (dataIndex: number) => {
    console.log('ApiKeyAssign#onRemove: dataIndex: ', dataIndex)

    if (dataArr[dataIndex]?._id) {
      removeData(dataArr[dataIndex]._id)
    }

    setDataArr(dataArr.filter((data, i) => i !== dataIndex))
  }

  useEffect(() => {
    if (!isFirstRender) {
      return
    }

    isFirstRender = false;

    (async () => {
      const newDataArr = await getAllData()
      setDataArr(newDataArr)
    })()
  }, [])

  return (
    <div className="flex flex-col items-center gap-4 p-4 border border-black rounded">
      <div>API Key Assignment</div>
      <div className="flex flex-col items-center gap-2">
        {dataArr.map((data, dataIndex) =>
          <div
            key={dataIndex}
            className="flex items-center gap-4"
          >
            <div className="text-xl">{dataIndex + 1}.</div>
            <input
              className="rounded-full"
              type="text"
              defaultValue={data.email}
              placeholder="Email"
              onChange={(event) => onEmailChange(dataIndex, event.target.value)}
            ></input>
            <input
              className="rounded-full"
              type="text"
              defaultValue={data.apiKey}
              placeholder="API Key"
              onChange={(event) => onApiKeyChange(dataIndex, event.target.value)}
            ></input>
            <div
              className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
              onClick={() => onRemove(dataIndex)}
            >
              Remove
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div
          className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
          onClick={onAdd}
        >
          Add
        </div>
        <div
          className='px-4 py-2 text-white bg-green-500 rounded-full cursor-pointer hover:text-black'
          onClick={onSave}
        >
          Save
        </div>
      </div>
    </div>
  )
}
