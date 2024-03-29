import React, { ReactElement, useEffect, useRef, useState } from 'react'

// styles
import './SignUpModal.css'
import '../Authentication.css'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill, RiUser3Fill } from 'react-icons/ri'

// contexts
import { useModalContext } from '../../../../../contexts/modal-context'

// component
import LoginModal from '../LoginModal/LoginModal'

// hooks
import { useSignUp } from '../../../../../hooks/account/authentication/useSignUp'

// interfaces
interface IProps {}

const SignUpModal = ({}: IProps) => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

  const { error, loading, signUp } = useSignUp()

  const { modalDispatch } = useModalContext()

  // handle open modal
  const handleOpenModal = (reactComponent: ReactElement) => {
    modalDispatch({
      type: 'OPEN',
      reactComponent,
    })
  }

  // handle close modal
  const handleCloseSignUpModal = () => {
    modalDispatch({
      type: 'CLOSE',
      reactComponent: null,
    })
  }

  // handle signup
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signUp({ name, email, password, passwordConfirmation })
  }

  // error style
  const titleRef = useRef<any>()
  useEffect(() => {
    if (error) {
      titleRef.current.classList.add('authentication-error-effect')
    }
  }, [error])

  return (
    <section className="signup-modal">
      {/*signup close button */}
      <button className="btn close-button" onClick={handleCloseSignUpModal}>
        <IoCloseCircleSharp className="icons" />
      </button>
      {/* signup title */}
      <h1 className="title" ref={titleRef}>
        {error || (
          <>
            <span className="left-arrow-effect">{'>'}</span> SignUp{' '}
            <span className="right-arrow-effect">{'<'}</span>
          </>
        )}
      </h1>
      <section className="form">
        <form onSubmit={handleSignUp}>
          <span className="msg">Thanks for joining us!</span>
          {/* Name */}
          <label className="name">
            <span>Name:</span>
            <RiUser3Fill className="icons" />
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          {/* E-mail */}
          <label className="email">
            <span>Email:</span>
            <MdEmail className="icons" />
            <input
              type="email"
              placeholder="Email"
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {/* Password Confirmation */}
          <label className="passwordConfirmation">
            <span>Password Confirmation:</span>
            <RiLockPasswordFill className="icons" />
            <input
              type="password"
              placeholder="Password Confirmation"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </label>
          {/* buttons */}
          <div className="buttons">
            <a
              className="btn btn-secondary"
              onClick={() => handleOpenModal(<LoginModal />)}
            >
              I'm already a user
            </a>
            {loading ? (
              <button className="btn btn-primary" disabled>
                Loading...
              </button>
            ) : (
              <button className="btn btn-primary">SignUp</button>
            )}
          </div>
        </form>
      </section>
      <div className="background">
        <img src={'/assets/images/signup-wallpaper.gif'} />
      </div>
    </section>
  )
}

export default SignUpModal
