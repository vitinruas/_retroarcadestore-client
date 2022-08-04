import { makeRequest } from '../helpers/request'

interface IFetch {
  receivedError: string
  receivedData: any
  statusCode: number
}

export const useFetch = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  dataToSend?: any,
  accessToken?: string | null
): Promise<IFetch> => {
  let receivedData: any
  let receivedError: any
  let statusCode: number = 0
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
    receivedError = 'Error! Try again later'
  }
  return { receivedError, receivedData, statusCode }
}
