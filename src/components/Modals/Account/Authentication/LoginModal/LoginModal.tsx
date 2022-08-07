import React, { ReactElement, useEffect, useRef, useState } from 'react'

// styles
import './LoginModal.css'
import '../Authentication.css'

import { IoCloseCircleSharp } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'

// components
import SignUpModal from '../SignupModal/SignUpModal'

// contexts
import { useModalContext } from '../../../../../contexts/modal-context'

// hooks
import { useLogin } from '../../../../../hooks/account/authentication/useLogin'

// interfaces
interface IProps {}

const LoginModal = ({}: IProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { error, loading, login } = useLogin()

  const { modalDispatch } = useModalContext()
  const handleOpenModal = (reactComponent: ReactElement) => {
    return modalDispatch({
      type: 'OPEN',
      reactComponent,
    })
  }
  const handleCloseLoginModal = () => {
    modalDispatch({
      type: 'CLOSE',
      reactComponent: null,
    })
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await login({ email, password })
  }

  const titleRef = useRef<any>()
  useEffect(() => {
    if (error) {
      titleRef.current.classList.add('authentication-error-effect')
    }
  }, [error])

  return (
    <section className="login-modal">
      {/* login close button */}
      <button className="btn close-button" onClick={handleCloseLoginModal}>
        <IoCloseCircleSharp className="icons" />
      </button>
      {/* login title */}
      <h1 className="title" ref={titleRef}>
        {error || (
          <>
            <span className="left-arrow-effect">{'>'}</span> Login{' '}
            <span className="right-arrow-effect">{'<'}</span>
          </>
        )}
      </h1>
      {/* login form  */}
      <form onSubmit={(e) => handleLogin(e)} className="form">
        <span className="msg">Welcome to back!</span>
        {/* E-mail */}
        <label className="email">
          <span>E-mail:</span>
          <MdEmail className="icons" />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {/* Password */}
        <label className="password">
          <span>Password:</span>
          <RiLockPasswordFill className="icons" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {/* buttons */}
        <div className="buttons">
          <a
            className="btn btn-secondary"
            onClick={() => handleOpenModal(<SignUpModal />)}
          >
            I'm new here
          </a>
          {loading ? (
            <button className="btn btn-primary" disabled>
              Loading...
            </button>
          ) : (
            <button className="btn btn-primary">Login</button>
          )}
        </div>
      </form>
    </section>
  )
}

export default LoginModal
