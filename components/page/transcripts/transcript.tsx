'use client'

export const Transcript = ({data}: {data: any}) => {
  return (
    <div className='w-1/2 p-3 lg:w-1/4'>
      <div className="flex flex-col gap-3 p-6 text-xs border rounded-lg bg-bg-gray">
        <div className='flex items-center gap-3'>
          <div className="w-full">Persona Name: </div>
          <div className="w-full">
            <div className='px-2 py-1 border w-fit bg-bg-light border-border-gray'>{data?.personaName}</div>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <div className="w-full">User ID: </div>
          <div className="w-full">
            <div className='px-2 py-1 border w-fit bg-bg-light border-border-gray'>{data?.userId}</div>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <div className="w-full">Date: </div>
          <div className="w-full">
            <div className='px-2 py-1 border w-fit bg-bg-light border-border-gray'>{data?.createdAt}</div>
          </div>
        </div>
        {data?.messages?.length &&
          <div className='flex flex-col gap-3'>
            <div>Messages: </div>
            <div className='flex flex-col gap-3 p-3 overflow-auto border rounded-lg bg-bg-light border-border-gray h-60'>
              {data.messages.map((message: any, index: number) => message.role === 'assistant' ?
                <div
                  key={index}
                  className='flex flex-col items-start text-text-dark'
                >
                  <div className='w-3/4 px-3 py-2 border rounded-bl-none bg-bg-gray border-border-gray rounded-xl'>{message.content}</div>
                </div> :
                <div
                  key={index}
                  className='flex flex-col items-end text-text-light'
                >
                  <div className='w-3/4 px-3 py-2 border rounded-bl-none bg-bg-blue border-border-gray rounded-xl'>{message.content}</div>
                </div>,
              )}
            </div>
          </div>
        }
      </div>
    </div>
  )
}
