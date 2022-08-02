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

// interface

interface IProps {}

const Profile = (props: IProps) => {
  const [photo, setPhoto] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [birthDay, setBirthDay] = useState<string>('')

  // get client data
  const {
    error: errorGetClient,
    loading: loadingGetClient,
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
    }
  }, [client])

  // update client data
  const {
    error: errorUpdateClient,
    loading: loadingUpdateClient,
    success,
    updateClient,
  } = useUpdateClient()

  const handleUpdateClient = (e: any) => {
    e.preventDefault()

    const dataForm: any = { name, email }

    let dataClientToUpdate: IUpdateClientUseCaseModel = {}

    for (const [key, value] of Object.entries(dataForm)) {
      if (key && value !== client[key]) {
        Object.assign(dataClientToUpdate, { [key]: value })
      }
    }
    updateClient(dataClientToUpdate)
  }

  return (
    <section className="profile">
      <div className="photo" title="Change image?">
        {photo ? <img src={photo} /> : <img src={ProfileImage} />}
      </div>
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

        {loadingUpdateClient ? (
          <button className="btn btn-primary disabled">Loading...</button>
        ) : (
          <button className="btn btn-primary">Save</button>
        )}
      </form>
    </section>
  )
}

export default Profile
