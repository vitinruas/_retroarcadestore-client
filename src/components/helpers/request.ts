export const makeRequest = (method: string, data: any): RequestInit => {
  let request: RequestInit = {}
  if (method === 'POST') {
    request = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    }
  }
  return request
}
