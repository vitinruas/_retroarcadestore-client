import React, { ReactElement } from 'react'

// styles
import './SignUpModal.css'
import PixelArt from './assets/images/pixelart.gif'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill, RiUser3Fill } from 'react-icons/ri'

// contexts
import { useModalContext } from '../../../contexts/modal-context'
import LoginModal from '../LoginModal/LoginModal'

// interfaces
interface IProps {}

const SignUpModal = ({}: IProps) => {
  const { dispatch } = useModalContext()
  const handleOpenModal = (reactComponent: ReactElement) => {
    dispatch({
      type: 'OPEN',
      reactComponent,
    })
  }
  const handleCloseSignUpModal = () => {
    dispatch({
      type: 'CLOSE',
      reactComponent: null,
    })
  }
  return (
    <section className="signup-modal">
      <button className="btn close" onClick={handleCloseSignUpModal}>
        <IoCloseCircleSharp className="icons" />
      </button>
      <h1 className="title">SignUp</h1>
      <form className="form">
        <span>Thanks for joining us!</span>
        {/* Name */}
        <label className="name">
          <span>Name:</span>
          <RiUser3Fill className="icons" />
          <input type="text" placeholder="Name" />
        </label>
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
        {/* Password Confirmation */}
        <label className="passwordConfirmation">
          <span>Password Confirmation:</span>
          <RiLockPasswordFill className="icons" />
          <input type="password" placeholder="Password Confirmation" />
        </label>
        {/* buttons */}
        <div className="buttons">
          <button
            className="btn btn-secondary"
            onClick={() => handleOpenModal(<LoginModal />)}
          >
            I'm already a user
          </button>
          <button className="btn btn-primary">SignUp</button>
        </div>
      </form>
      <div className="background">
        <img src={PixelArt} />
      </div>
    </section>
  )
}

export default SignUpModal
