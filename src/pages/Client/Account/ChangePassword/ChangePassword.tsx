import React, { useEffect, useState } from 'react'

// style
import './ChangePassword.css'
import { BsFillExclamationSquareFill } from 'react-icons/bs'
import { AiFillLock, AiFillUnlock } from 'react-icons/ai'

// hooks
import { useUpdateClient } from '../../../../hooks/client/useUpdateClient'
import { useMessageContext } from '../../../../contexts/message-context'

// interfaces
interface IProps {}
interface IFormData {
  password: string
  newPassword: string
  newPasswordConfirmation: string
}
import { IUpdateClientUseCaseModel } from '../../../../protocols/usecase/client/update-client-protocol'

const ChangePassword = (props: IProps) => {
  const [password, setPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    useState<string>('')
  const {
    error: updateClientError,
    loading: updateClientLoading,
    success: updateClientSuccess,
    updateClient,
  } = useUpdateClient()
  const { messageDispatch } = useMessageContext()

  // update client password
  const handleUpdateClientPassword = (e: any) => {
    e.preventDefault()
    const formData: IFormData = {
      password,
      newPassword,
      newPasswordConfirmation,
    }
    let passwordClientToUpdate: IUpdateClientUseCaseModel = {}
    Object.keys(formData).map((key: string) => {
      if (formData[key as keyof IFormData]) {
        Object.assign(passwordClientToUpdate, {
          ...passwordClientToUpdate,
          [key]: formData[key as keyof IFormData],
        })
      }
    })
    passwordClientToUpdate && updateClient(passwordClientToUpdate)
  }

  // setup messages
  useEffect(() => {
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
  }, [updateClientError])
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

  // avoid memory leak
  useEffect(() => {
    return () => {}
  }, [])
  return (
    <section className="changePassword">
      <div className="warning">
        <BsFillExclamationSquareFill className="icons" />
        <span>You should enter your current password to change:</span>
      </div>
      <form onSubmit={handleUpdateClientPassword}>
        <label>
          <span>Password:</span>
          <AiFillUnlock className="icons" />
          <input
            type="password"
            placeholder="Current Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>New Password:</span>
          <AiFillLock className="icons" />
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <label>
          <span>New Password Confirmation:</span>
          <AiFillLock className="icons" />
          <input
            type="password"
            placeholder="New Password Confirmation"
            onChange={(e) => setNewPasswordConfirmation(e.target.value)}
          />
        </label>
        {updateClientLoading ? (
          <button className="btn btn-primary" disabled>
            Loading...
          </button>
        ) : (
          <button className="btn btn-primary">Save</button>
        )}{' '}
      </form>
    </section>
  )
}

export default ChangePassword
