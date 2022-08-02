import { makeRequest } from '../helpers/request'

interface IFetch {
  receivedError: string
  receivedData: any
  statusCode: number
}

export const useFetch = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  dataToSend?: any
): Promise<IFetch> => {
  let receivedData: any
  let receivedError: any
  let statusCode: number = 0
  try {
    const request = makeRequest(method, dataToSend)
    const response = await fetch(url, request)
    statusCode = response.status
    const data = await response.json()
    if (response.status >= 400) {
      receivedError = data
    }
    receivedData = data
  } catch (error) {
    console.error('fetch error ->', error)
    receivedError = 'Error! Try again later'
  }
  return { receivedError, receivedData, statusCode }
}
