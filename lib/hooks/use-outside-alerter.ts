import {useEffect} from 'react'
import {isFunction} from '../common'


export const useOutsideAlerter = (ref: any, onOutside: any) => {
  useEffect(() => {
    const onMouseDown = (event: any) => {
      // event.stopPropagation()

      if (ref.current && !ref.current.contains(event.target) && isFunction(onOutside)) {
        onOutside()
      }
    }

    document.addEventListener('mousedown', onMouseDown)

    return () => {
      document.removeEventListener('mousedown', onMouseDown)
    }
  }, [onOutside, ref])
}
