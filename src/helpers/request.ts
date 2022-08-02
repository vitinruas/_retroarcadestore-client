export const api = {}
export const makeRequest = (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  dataToSend: any,
  accessToken?: string | null
): RequestInit => {
  let request: RequestInit = {}
  if (method === 'GET' && accessToken) {
    request = {
      headers: {
        'x-access-token': accessToken,
      },
      method,
    }
  } else if (method === 'GET' && !dataToSend && !accessToken) {
    request = {
      method,
    }
  } else if (method === 'PUT' && dataToSend && accessToken) {
    const formData = new FormData()
    Object.keys(dataToSend).map((key) => {
      formData.append(key, dataToSend[key])
    })
    request = {
      headers: {
        'x-access-token': accessToken,
      },
      method,
      body: formData,
    }
  } else if (method === 'POST' && dataToSend && !accessToken) {
    request = {
      headers: {
        'Content-Type': 'application/json',
      },
      method,
      body: JSON.stringify(dataToSend),
    }
  }
  return request
}
