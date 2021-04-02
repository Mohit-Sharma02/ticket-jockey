import { useEffect, useState } from "react"

export const useTimer = (duration = 15000) => {
  let timerId = null
  const [isTimeUp, setTimeUp] = useState(false)

  useEffect(() => {
    timerId = setTimeout(() => {
      timerId = null
      setTimeUp(true)
    }, duration)

    return () => {
      timerId && clearTimeout(timerId)
    }
  }, [])

  return isTimeUp
}
