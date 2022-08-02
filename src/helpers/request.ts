export const api = {}
export const makeRequest = (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  dataToSend: any
): RequestInit => {
  let request: RequestInit = {}
  if (method === 'GET' && !dataToSend) {
    request = {
      method,
    }
  } else if (method === 'POST') {
    request = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(dataToSend),
    }
  }
  return request
}
