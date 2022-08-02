import React from 'react'
import { AiFillUnlock } from 'react-icons/ai'
import { BsFillExclamationSquareFill } from 'react-icons/bs'

type Props = {}

const Advanced = (props: Props) => {
  return (
    <section>
      <h2>Close my account</h2>
      <div className="warning">
        <BsFillExclamationSquareFill className="icons" />
        <span>You won't be able recover your account after this action</span>
      </div>
      <form>
        <label>
          <span>Password:</span>
          <AiFillUnlock className="icons" />
          <input type="password" placeholder="Password" />
        </label>
      </form>
      <button className="btn btn-primary">I want close my Account</button>
    </section>
  )
}

export default Advanced
