import React, { useEffect, useState } from 'react'

// styles
import './Profile.css'
import ProfileImage from './assets/images/profile.png'
import { RiUser3Fill } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'
import { FaBirthdayCake } from 'react-icons/fa'

// hooks
import { useGetClient } from '../../../../hooks/client/useGetClient'
import { useUpdateClient } from '../../../../hooks/client/useUpdateClient'
import { IUpdateClientUseCaseModel } from '../../../../protocols/usecase/client/update-client-protocol'
import { IClientEntitie } from '../../../../protocols/entities/account/client-entitie'
import { useMessageContext } from '../../../../contexts/message-context'

// interface
interface IProps {}
interface IFormData {
  name?: string
  email?: string
  birthDay?: string
}

const Profile = (props: IProps) => {
  const [photo, setPhoto] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [birthDay, setBirthDay] = useState<string>('')
  const { dispatch: dispatchMessage } = useMessageContext()
  // get client data
  const {
    error: getClientError,
    loading: getClientLoading,
    client,
    getClient,
  } = useGetClient()
  useEffect(() => {
    getClient()
  }, [])

  useEffect(() => {
    if (client) {
      setPhoto(client.photo || '')
      setName(client.name)
      setEmail(client.email)
      setBirthDay(client.birthDay || '')
      console.log(client)
    }
  }, [client])

  // update client data
  const {
    error: updateClientError,
    loading: updateClietSuccess,
    success: updateClientSuccess,
    updateClient,
  } = useUpdateClient()

  const handleUpdateClient = (e: any) => {
    e.preventDefault()
    const formData: IFormData = { name, email, birthDay }
    let dataClientToUpdate: IUpdateClientUseCaseModel = {}
    Object.keys(formData).map((key: string) => {
      if (
        formData[key as keyof IFormData] &&
        formData[key as keyof IFormData] !==
          client![key as keyof IClientEntitie]
      ) {
        Object.assign(dataClientToUpdate, {
          ...dataClientToUpdate,
          [key]: formData[key as keyof IFormData],
        })
      }
    })

    dataClientToUpdate && updateClient(dataClientToUpdate)
  }

  // setup messages
  useEffect(() => {
    if (getClientError || updateClientError) {
      dispatchMessage({
        type: 'OPEN',
        component: 'ACCOUNT',
        messageBody: getClientError || updateClientError,
        messageType: 'ERROR',
        styleClass: 'msg-client-error',
      })
    }
  }, [getClientError, updateClientError])
  useEffect(() => {
    if (updateClientSuccess) {
      dispatchMessage({
        type: 'OPEN',
        component: 'ACCOUNT',
        messageBody: updateClientSuccess,
        messageType: 'SUCCESS',
        styleClass: 'msg-client-success',
      })
    }
  }, [updateClientSuccess])

  return (
    <section className="profile">
      {/* section loading */}
      {getClientLoading ? (
        <span className="msg-loading">Loading...</span>
      ) : (
        <>
          {/* account id */}
          <span className="id">Account ID: {client && client.uid}</span>

          {/* photo profile */}
          <div className="photo" title="Change image?">
            {photo ? <img src={photo} /> : <img src={ProfileImage} />}
          </div>

          {/* form profile */}
          <form className="informations" onSubmit={handleUpdateClient}>
            <label>
              <span>Name:</span>
              <RiUser3Fill className="icons" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              <span>Email:</span>
              <MdEmail className="icons" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <span>BirthDay:</span>
              <FaBirthdayCake className="icons" />
              <input
                type="date"
                placeholder="BirthDay"
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
              />
            </label>
            {updateClietSuccess ? (
              <button className="btn btn-primary disabled">Loading...</button>
            ) : (
              <button className="btn btn-primary">Save</button>
            )}
          </form>
        </>
      )}
    </section>
  )
}

export default Profile
