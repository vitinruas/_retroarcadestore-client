import { useState } from 'react'
import { api } from '../../../helpers/url'
import { useFetch } from '../../useFetch'
import { IAddress } from '../../../protocols/entities/account/client-entitie'

export interface IUseZipCode {
  getAddressZipCode: (code: string, country: string) => {}
  address: IAddress
}

export const useZipCode = () => {
  const [address, setAddress] = useState<IAddress>({})
  const [error, setError] = useState<string | null>(null)
  const getAddressZipCode = async (code: string, country: string) => {
    const url = `${api.postalCodeAPI}/${country}/${code}`
    const { receivedData, receivedError, statusCode } = await useFetch(
      url,
      'GET'
    )
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
  return { address, getAddressZipCode }
}
