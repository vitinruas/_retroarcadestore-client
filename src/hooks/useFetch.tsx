import React from 'react'

interface IUseFetch {
  loading: boolean
  error: string | null
  dataResponse: any
}

export const useFetch = async (
  route: string,
  method: string,
  dataRequest: any
): Promise<IUseFetch> => {
  let loading: boolean = true
  let error: string | null = null
  let response: any

  // create request
  let request: RequestInit = {}
  if (method === 'POST') {
    request = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(dataRequest),
    }
  }

  // connect to api
  response = await fetch('http://localhost:5000/api' + route, request)
  const dataResponse = await response.json()
  if (response.status >= 400) {
    error = dataResponse
  } else loading = false

  return {
    loading,
    error,
    dataResponse,
  }
}
