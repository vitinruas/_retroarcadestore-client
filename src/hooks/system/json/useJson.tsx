import { useState } from 'react'
import { api, json } from '../../../helpers/url'
import { useFetch } from '../../useFetch'
import { IAddress } from '../../../protocols/entities/account/client-entitie'

export interface IUseJson {
  data: any
  error: string | null
  getJson: (url: string) => {}
}

export const useJson = (): IUseJson => {
  const [data, setData] = useState<object | null>(null)
  const [error, setError] = useState<string | null>(null)
  const getJson = async (url: string) => {
    const { receivedData, receivedError } = await useFetch(url, 'GET')

    if (receivedData) {
      setData(receivedData)
    } else {
      setError(receivedError)
    }
  }
  return { data, error, getJson }
}
