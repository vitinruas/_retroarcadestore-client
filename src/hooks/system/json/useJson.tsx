import { useState } from 'react'
import { useFetch } from '../../useFetch'

// interfaces
export interface IUseJson {
  data: any
  error: string | null
  getJson: (url: string) => {}
}

export const useJson = (): IUseJson => {
  // states
  const [data, setData] = useState<object | null>(null)
  const [error, setError] = useState<string | null>(null)

  // hooks
  const { send } = useFetch()

  const getJson = async (url: string) => {
    const { receivedError, receivedData, statusCode } = await send(url, 'GET')

    if (receivedData) {
      setData(receivedData)
    } else {
      setError(receivedError)
    }
  }
  return { data, error, getJson }
}
