import { makeRequest } from '../components/helpers/request'

interface IFetch {
  receivedError: string
  receivedData: any
}

export const useFetch = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  dataToSend: any
): Promise<IFetch> => {
  let receivedData: any
  let receivedError: any
  try {
    const request = makeRequest(method, dataToSend)
    const response = await fetch(url, request)
    const data = await response.json()
    if (response.status >= 400) {
      receivedError = data
    }
    receivedData = data
  } catch (error) {
    receivedError = 'Error! Try again later'
  }
  return { receivedError, receivedData }
}
