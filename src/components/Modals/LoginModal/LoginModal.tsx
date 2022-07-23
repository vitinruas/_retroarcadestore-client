import React, { ReactElement } from 'react'

// styles
import './LoginModal.css'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill, RiUser3Fill } from 'react-icons/ri'

// contexts
import { useModalContext } from '../../../contexts/modal-context'
import SignUpModal from '../SignupModal/SignUpModal'

// interfaces
interface IProps {}

const LoginModal = ({}: IProps) => {
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
  return (
    <section className="login-modal">
      <button className="btn close" onClick={handleCloseLoginModal}>
        <IoCloseCircleSharp className="icons" />
      </button>
      <h1 className="title">Login</h1>
      <form className="form">
        <span>Welcome to back! =)</span>
        {/* E-mail */}
        <label className="email">
          <span>E-mail:</span>
          <MdEmail className="icons" />
          <input type="email" placeholder="E-mail" />
        </label>
        {/* Password */}
        <label className="password">
          <span>Password:</span>
          <RiLockPasswordFill className="icons" />
          <input type="password" placeholder="Password" />
        </label>
        {/* buttons */}
        <div className="buttons">
          <button
            className="btn btn-secondary"
            onClick={() => handleOpenModal(<SignUpModal />)}
          >
            I'm new here
          </button>
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </section>
  )
}

export default LoginModal
