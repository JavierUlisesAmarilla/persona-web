'use client'

export const Transcript = ({data, classNames}: {data: any, classNames?: string}) => {
  return (
    <div className={`w-1/2 p-3 lg:w-1/4 ${classNames}`}>
      <div className="flex flex-col gap-3 p-6 text-xs border rounded-lg bg-bg-gray">
        <div className='flex items-center justify-between'>
          <div>Persona Name: </div>
          <div className='px-2 py-1 border bg-bg-light border-border-gray text-right'>{data?.personaName}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div>User ID: </div>
          <div className='px-2 py-1 border bg-bg-light border-border-gray text-right'>{data?.userId}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div>Date: </div>
          <div className='px-2 py-1 border bg-bg-light border-border-gray text-right'>{data?.createdAt}</div>
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
                  <div className='w-auto max-w-3/4 px-3 py-2 border rounded-bl-none bg-bg-gray border-border-gray rounded-xl'>{message.content}</div>
                </div> :
                <div
                  key={index}
                  className='flex flex-col items-end text-text-light'
                >
                  <div className='w-auto max-w-3/4 px-3 py-2 border rounded-br-none bg-bg-blue border-border-gray rounded-xl'>{message.content}</div>
                </div>,
              )}
            </div>
          </div>
        }
      </div>
    </div>
  )
}
