// hooks
import { useState } from 'react'
import { useFetch } from '../../useFetch'

// api
import { api } from '../../../helpers/url'

// interfaces
import { IAddress } from '../../../protocols/entities/account/client-entitie'
export interface IUseZipCode {
  error: string | null
  getAddressZipCode: (code: string, country: string) => {}
  address: IAddress
}

export const useZipCode = () => {
  // states
  const [address, setAddress] = useState<IAddress>({})
  const [error, setError] = useState<string | null>(null)

  // hooks
  const { send } = useFetch()

  const getAddressZipCode = async (code: string, country: string) => {
    const url = `${api.postalCodeAPI}/${country}/${code}`
    const { receivedError, receivedData, statusCode } = await send(url, 'GET')
    if (receivedData && statusCode === 200) {
      setAddress({
        street: '',
        zipCode: receivedData['post code'],
        district: '',
        city: receivedData.places[0]['place name'],
        state: receivedData.places[0]['state'],
        country: receivedData.country,
      })
    } else {
      setError(receivedError)
    }
  }
  return { error, address, getAddressZipCode }
}
