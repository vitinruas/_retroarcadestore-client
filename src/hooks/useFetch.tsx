import { useNavigate } from 'react-router-dom'
import { useMessageContext } from '../contexts/message-context'
import { api, makeRequest } from '../helpers/request'

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
  const { dispatch: dispatchMessage } = useMessageContext()
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
      dispatchMessage({
        type: 'OPEN',
        component: 'APP',
        messageType: 'ERROR',
        messageBody: 'Oops! something was wrong =(',
        styleClass: 'msg-app-error',
      })
      // throw message error to client and try reconnect
      const tryConnectInterval = setInterval(async () => {
        try {
          await fetch('http://localhost:5000/api').then(() => {
            dispatchMessage({
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
  return { send }
}
