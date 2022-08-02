import React from 'react'

// style
import './ChangePassword.css'
import { BsFillExclamationSquareFill } from 'react-icons/bs'
import { AiFillLock, AiFillUnlock } from 'react-icons/ai'

interface IProps {}

const ChangePassword = (props: IProps) => {
  return (
    <section className="changePassword">
      <div className="warning">
        <BsFillExclamationSquareFill className="icons" />
        <span>You should enter your current password to change:</span>
      </div>
      <form>
        <label>
          <span>Password:</span>
          <AiFillUnlock className="icons" />
          <input type="password" placeholder="Current Password" />
        </label>
        <label>
          <span>New Password:</span>
          <AiFillLock className="icons" />
          <input type="password" placeholder="New Password" />
        </label>
        <label>
          <span>New Password Confirmation:</span>
          <AiFillLock className="icons" />
          <input type="password" placeholder="New Password Confirmation" />
        </label>
        <button className="btn btn-primary">Save</button>
      </form>
    </section>
  )
}

export default ChangePassword
