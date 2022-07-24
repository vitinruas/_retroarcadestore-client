import React, { ReactElement, useEffect, useRef, useState } from 'react'

// styles
import './LoginModal.css'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill, RiUser3Fill } from 'react-icons/ri'

// contexts
import { useModalContext } from '../../../contexts/modal-context'
import SignUpModal from '../SignupModal/SignUpModal'
import { useLogin } from '../../../hooks/user/useLogin'

// interfaces
interface IProps {}

const LoginModal = ({}: IProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { error, loading, authenticate } = useLogin()

  const { dispatch } = useModalContext()
  const handleOpenModal = (reactComponent: ReactElement) => {
    return dispatch({
      type: 'OPEN',
      reactComponent,
    })
  }
  const handleCloseLoginModal = () => {
    dispatch({
      type: 'CLOSE',
      reactComponent: null,
    })
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    authenticate({ email, password })
  }

  const titleRef = useRef<any>()
  useEffect(() => {
    if (error) {
      titleRef.current.classList.add('authentication-error-effect')
    }
  }, [error])

  return (
    <section className="login-modal">
      <button className="btn close" onClick={handleCloseLoginModal}>
        <IoCloseCircleSharp className="icons" />
      </button>
      <h1 className="title" ref={titleRef}>
        {error || 'Login'}
      </h1>
      <form onSubmit={(e) => handleLogin(e)} className="form">
        <span>Welcome to back! =)</span>
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
            <button className="btn btn-primary disabled">Loading...</button>
          ) : (
            <button className="btn btn-primary">Login</button>
          )}
        </div>
      </form>
    </section>
  )
}

export default LoginModal
