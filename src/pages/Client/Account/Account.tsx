import React, { ReactElement, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'

// components
import Message from '../../../components/Message/Message'

// hooks
import { useMessageContext } from '../../../contexts/message-context'

// styles
import './Account.css'
import { AiFillLock } from 'react-icons/ai'
import { FaMapSigns } from 'react-icons/fa'
import { RiSettings4Fill, RiUser3Fill } from 'react-icons/ri'

// interfaces
interface IProps {
  children: ReactElement
}

const Account = ({ children }: IProps) => {
  const { state: messageState } = useMessageContext()

  return (
    <section className="account">
      {/* account section message */}
      {messageState.isOpen && messageState.component === 'ACCOUNT' && (
        <Message
          message={messageState.messageContent!.body}
          style={messageState.style}
        />
      )}

      {/* account section title */}
      <h1 className="section-title">My Account</h1>

      {/* account section container */}
      <section className="container">
        <nav className="account-nav">
          <ul>
            <NavLink to={'/account/profile'}>
              <RiUser3Fill className="icons" />
              <span>Profile</span>
            </NavLink>
            <NavLink to={'/account/address'}>
              <FaMapSigns className="icons" />

              <span>Address</span>
            </NavLink>
            <NavLink to={'/account/changePassword'}>
              <AiFillLock className="icons" />

              <span>Password</span>
            </NavLink>
            <NavLink to={'/account/advanced'}>
              <RiSettings4Fill className="icons" />

              <span>Advanced</span>
            </NavLink>
          </ul>
        </nav>
        <section className="content">{children}</section>
      </section>
    </section>
  )
}

export default Account
