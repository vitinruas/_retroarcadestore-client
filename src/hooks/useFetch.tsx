import { useState } from 'react'
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
      // dispatch({
      //   type: 'OPEN',
      //   component: 'APP',
      //   messageType: 'ERROR',
      //   messageBody: 'Your connection to our servers has been lost',
      //   styleClass: 'msg-app-error',
      // })
    }
    return { receivedError, receivedData, statusCode }
  }
  return { send }
}
