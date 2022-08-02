import React, { ReactElement } from 'react'
import { AiFillLock } from 'react-icons/ai'
import { FaMapSigns } from 'react-icons/fa'
import { IoMdOptions } from 'react-icons/io'
import { RiUser3Fill } from 'react-icons/ri'
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
              <IoMdOptions className="icons" />

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
