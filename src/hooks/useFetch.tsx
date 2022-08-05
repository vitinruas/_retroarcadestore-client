import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMessageContext } from '../contexts/message-context'
import { makeRequest } from '../helpers/request'

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
  const { dispatch: messageDispatch } = useMessageContext()
  const navigate = useNavigate()

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

      if (response.status >= 400) {
        receivedError = data
      }
      receivedData = data
    } catch (error) {
      messageDispatch({
        type: 'OPEN',
        component: 'APP',
        messageContent: {
          title: 'Oops! something was wrong =(',
          body: 'Check your connection or try later because maybe there is a possible maintenance',
          type: 'ERROR',
        },
        style: 'msg-app-error',
      })
      // throw message error to client and try reconnect
      const tryConnectInterval = setInterval(async () => {
        try {
          await fetch('http://localhost:5000/api').then(() => {
            messageDispatch({
              type: 'CLOSE',
            })
            clearInterval(tryConnectInterval)
            return navigate('./')
          })
        } catch (error) {}
      }, 3000)
    }
    return { receivedError, receivedData, statusCode }
  }
  // avoid memory leak
  useEffect(() => {
    return () => {}
  }, [])
  return { send }
}
