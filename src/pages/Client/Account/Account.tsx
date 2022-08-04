import React, { ReactElement } from 'react'
import { AiFillLock } from 'react-icons/ai'
import { FaMapSigns } from 'react-icons/fa'
import { RiSettings4Fill, RiUser3Fill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import Message from '../../../components/Message/Message'
import { useMessageContext } from '../../../contexts/message-context'

// styles
import './Account.css'

// interfaces
interface IProps {
  children: ReactElement
}

const Account = ({ children }: IProps) => {
  const { state: messageState } = useMessageContext()
  console.log(messageState)
  return (
    <section className="account">
      {messageState.isOpen && messageState.component === 'ACCOUNT' && (
        <Message
          messageBody={messageState.messageBody}
          styleClass={messageState.styleClass}
        />
      )}
      <h1 className="section-title">My Account</h1>
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
