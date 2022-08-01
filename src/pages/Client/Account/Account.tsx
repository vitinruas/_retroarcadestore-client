import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

// styles
import './Account.css'

interface IProps {
  children: ReactElement
}

const Account = ({ children }: IProps) => {
  return (
    <section className="account">
      <h1 className="section-title">My Account</h1>
      <section className="container">
        <nav className="account-nav">
          <ul>
            <li>
              <NavLink to={'/account/profile'}>Profile</NavLink>
            </li>
            <li>
              <NavLink to={'/account/address'}>Address</NavLink>
            </li>
            <li>
              <NavLink to={'/account/changePassword'}>Change Password</NavLink>
            </li>
            <li>
              <NavLink to={'/account/advanced'}>Advanced</NavLink>
            </li>
          </ul>
        </nav>
        <section className="content">{children}</section>
      </section>
    </section>
  )
}

export default Account
