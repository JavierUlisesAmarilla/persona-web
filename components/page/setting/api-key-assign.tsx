"use client"

import { getAllData, removeData, saveData } from "@/lib/mongo-db"
import { useZustand } from "@/lib/store/use-zustand"
import { useEffect } from "react"


let isFirstRender = true


export default function ApiKeyAssign() {
  const { emailKeyArr, setEmailKeyArr } = useZustand()

  const onAdd = () => {
    setEmailKeyArr([...emailKeyArr, { email: '', apiKey: '' }])
  }

  const onEmailChange = (dataIndex: number, email: string) => {
    const newEmailKeyArr = [...emailKeyArr]
    newEmailKeyArr[dataIndex].email = email
    setEmailKeyArr(newEmailKeyArr)
  }

  const onApiKeyChange = (dataIndex: number, apiKey: string) => {
    const newEmailKeyArr = [...emailKeyArr]
    newEmailKeyArr[dataIndex].apiKey = apiKey
    setEmailKeyArr(newEmailKeyArr)
  }

  const onSave = () => {
    console.log('ApiKeyAssign#onSave: emailKeyArr: ', emailKeyArr)
    emailKeyArr.forEach((data) => saveData(data))
  }

  const onRemove = (dataIndex: number) => {
    if (emailKeyArr[dataIndex]?._id) {
      removeData(emailKeyArr[dataIndex]._id)
    }

    setEmailKeyArr(emailKeyArr.filter((data, i) => i !== dataIndex))
  }

  useEffect(() => {
    if (!isFirstRender) {
      return
    }

    isFirstRender = false;

    (async () => {
      const newEmailKeyArr = await getAllData()
      setEmailKeyArr(newEmailKeyArr)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col items-center gap-4 p-4 border border-black rounded">
      <div>API Key Assignment</div>
      <div className="flex flex-col items-center gap-2">
        {emailKeyArr.map((data, dataIndex) =>
          <div
            key={dataIndex}
            className="flex items-center gap-4"
          >
            <div className="text-xl">{dataIndex + 1}.</div>
            <input
              className="rounded-full"
              type="text"
              value={data.email}
              placeholder="Email"
              onChange={(event) => onEmailChange(dataIndex, event.target.value)}
            ></input>
            <input
              className="rounded-full"
              type="text"
              value={data.apiKey}
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
