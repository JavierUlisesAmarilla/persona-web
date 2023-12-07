'use client'

export const Transcript = ({data, classNames}: {data: any, classNames?: string}) => {
  return (
    <div className={`flex flex-col gap-3 w-1/3 lg:w-1/5 p-6 text-xs border rounded-lg bg-bg-light flex-grow ${classNames}`}>
      <div className='flex items-center gap-3 justify-end'>
        <div className="w-full">Persona Name: </div>
        <div className="">
          <div className='px-2 py-1 border bg-bg-light border-border-gray text-right w-fit'>{data?.personaName}</div>
        </div>
      </div>
      <div className='flex items-center gap-3 justify-end'>
        <div className="w-full">User ID: </div>
        <div className="">
          <div className='px-2 py-1 border bg-bg-light border-border-gray text-right w-fit'>{data?.userId}</div>
        </div>
      </div>
      <div className='flex items-center gap-3 justify-end'>
        <div className="w-full">Date: </div>
        <div className="">
          <div className='px-2 py-1 border bg-bg-light border-border-gray text-right w-fit'>{data?.createdAt}</div>
        </div>
      </div>
      {data?.messages?.length &&
        <div className='flex items-center gap-3 justify-end'>
          <div className="w-full">Messages Count: </div>
          <div className="">
            <div className='px-2 py-1 border bg-bg-light border-border-gray text-right w-fit'>{Math.floor(data?.messages?.length / 2)}</div>
          </div>
        </div>
      }
      {data?.messages?.length &&
        <div className='flex flex-col gap-3'>
          <div>Messages: </div>
          <div className='flex flex-col gap-3 p-3 overflow-auto border rounded-lg bg-bg-light border-border-gray h-60'>
            {data.messages.map((message: any, index: number) => message.role === 'assistant' ?
              <div
                key={index}
                className='flex flex-col items-start text-text-dark'
              >
                <div className='w-auto px-3 py-2 border rounded-bl-none max-w-3/4 bg-bg-gray border-border-gray rounded-xl'>{message.content}</div>
              </div> :
              <div
                key={index}
                className='flex flex-col items-end text-text-light'
              >
                <div className='w-auto px-3 py-2 border rounded-br-none max-w-3/4 bg-bg-blue border-border-gray rounded-xl'>{message.content}</div>
              </div>,
            )}
          </div>
        </div>
      }
    </div>
  )
}
