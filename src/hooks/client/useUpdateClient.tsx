// hooks
import { useState } from 'react'
import { useFetch } from '../useFetch'
// api
import { api } from '../../helpers/url'
// interfaces
import { IClientEntitie } from '../../protocols/entities/account/client-entitie'
import { IUpdateClientUseCaseModel } from '../../protocols/usecase/client/update-client-protocol'
interface IUseUpdateClient {
  loading: boolean
  success: string | null
  error: string | null
  updateClient: (dataToUpdate: IUpdateClientUseCaseModel) => {}
}

export const useUpdateClient = (): IUseUpdateClient => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<string | null>(null)
  const { send } = useFetch()

  const updateClient = async (dataToUpdate: IUpdateClientUseCaseModel) => {
    setLoading(true)
    const url = `${api.restAPI}/client`
    const accessToken: string | null = localStorage.getItem('accessToken')
    const { receivedError, receivedData, statusCode } = await send(
      url,
      'PUT',
      dataToUpdate,
      accessToken
    )
    // check if in response there is access token
    if (statusCode === 204) {
      setSuccess('Your data have been successfully updated')
      setError(null)
    } else {
      setError(receivedError)
      setSuccess(null)
    }
    setLoading(false)
  }
  return { loading, success, error, updateClient }
}
