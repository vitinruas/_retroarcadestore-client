import React, { useEffect, useState, useRef } from 'react'

// styles
import './Profile.css'
import { RiUser3Fill } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'
import { FaBirthdayCake } from 'react-icons/fa'

// hooks
import { useGetClient } from '../../../../hooks/client/useGetClient'
import { useUpdateClient } from '../../../../hooks/client/useUpdateClient'
import { useMessageContext } from '../../../../contexts/message-context'

// interface
interface IProps {}
interface IFormData {
  name?: string
  email?: string
  birthDay?: string
  photo?: File | null
}
import { IUpdateClientUseCaseModel } from '../../../../protocols/usecase/client/update-client-protocol'
import { IClientEntitie } from '../../../../protocols/entities/account/client-entitie'

const Profile = (props: IProps) => {
  // states
  const [photo, setPhoto] = useState<string>('')
  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [birthDay, setBirthDay] = useState<string>('')

  // refs
  const photoUploaderINPUT = useRef<any>()
  const editPhotoIMG = useRef<any>()

  // contexts
  const { messageDispatch } = useMessageContext()

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
    }
  }, [client])

  // update client data
  const {
    error: updateClientError,
    loading: updateClientLoading,
    success: updateClientSuccess,
    updateClient,
  } = useUpdateClient()

  // handle show edit button
  const handleShowEditPhotoEffect = () => {
    editPhotoIMG.current.classList.add('show-edit-photo-effect')
  }

  // handle hidden edit button
  const handleHiddenEditPhotoEffect = () => {
    editPhotoIMG.current.classList.remove('show-edit-photo-effect')
  }

  // handle open file manager
  const handlePhotoClick = () => {
    photoUploaderINPUT.current.click()
  }

  // handle upload photo
  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoToUpload(e.target.files && e.target.files[0])
  }

  // handle update client
  const handleUpdateClientData = (e: any) => {
    e.preventDefault()
    const formData: IFormData = { name, email, birthDay, photo: photoToUpload }
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
    if (getClientError) {
      messageDispatch({
        type: 'OPEN',
        component: 'ACCOUNT',
        messageContent: {
          type: 'ERROR',
          body: getClientError,
          options: null,
          title: null,
        },
        style: 'msg-client-error',
      })
    }

    if (updateClientError) {
      messageDispatch({
        type: 'OPEN',
        component: 'ACCOUNT',
        messageContent: {
          type: 'ERROR',
          body: updateClientError,
          options: null,
          title: null,
        },
        style: 'msg-client-error',
      })
    }
  }, [getClientError, updateClientError])
  useEffect(() => {
    if (updateClientSuccess) {
      messageDispatch({
        type: 'OPEN',
        component: 'ACCOUNT',
        messageContent: {
          type: 'ERROR',
          body: updateClientSuccess,
          options: null,
          title: null,
        },
        style: 'msg-client-success',
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
          <figure
            className="photo"
            onClick={handlePhotoClick}
            onMouseOver={handleShowEditPhotoEffect}
            onMouseLeave={handleHiddenEditPhotoEffect}
          >
            <img
              className="edit"
              src="/assets/images/edit.png"
              ref={editPhotoIMG}
            />
            <img
              src={
                photoToUpload
                  ? URL.createObjectURL(photoToUpload)
                  : photo
                  ? `http://localhost:5000/uploads/client/${photo}`
                  : '/assets/images/profile.png'
              }
              alt=""
            />
          </figure>

          {/* form profile */}
          <form className="informations" onSubmit={handleUpdateClientData}>
            <input
              ref={photoUploaderINPUT}
              type="file"
              onChange={(e) => handleUploadPhoto(e)}
            />
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
            {updateClientLoading ? (
              <button className="btn btn-primary" disabled>
                Loading...
              </button>
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
