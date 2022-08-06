import { useEffect } from 'react'
import { makeRequest } from '../helpers/request'
import { useSystemMessage } from './system/messages/useSystemMessage'

interface IFetch {
  send(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    dataToSend?: any,
    accessToken?: string | null
  ): Promise<{
    receivedError: string | null
    receivedData: any
    statusCode: number
  }>
}

export const useFetch = (): IFetch => {
  const { dispatchThrowConnectionError, dispatchServerError } =
    useSystemMessage()

  const send = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    dataToSend?: any,
    accessToken?: string | null
  ): Promise<{
    receivedError: string | null
    receivedData: any
    statusCode: number
  }> => {
    let statusCode: number = 0
    let receivedData: any = null
    let receivedError: string | null = null

    try {
      const request: RequestInit = makeRequest(method, dataToSend, accessToken)
      const response: Response = await fetch(url, request)
      const data: any = response.status !== 204 ? await response.json() : null
      statusCode = response.status
      if (response.status >= 500) {
        dispatchServerError()
      } else if (response.status >= 400) {
        receivedError = data
      } else {
        receivedData = data
      }
    } catch (error: any) {
      if (!navigator.onLine) {
        dispatchThrowConnectionError()
      } else {
        dispatchServerError()
      }
    }

    return { receivedError, receivedData, statusCode }
  }
  // avoid memory leak
  useEffect(() => {
    return () => {}
  }, [])
  return { send }
}
