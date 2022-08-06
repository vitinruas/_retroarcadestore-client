import React, { useEffect } from 'react'
import { AiFillUnlock } from 'react-icons/ai'
import { BsFillExclamationSquareFill } from 'react-icons/bs'

// styles
import './Advanced.css'

// interfaces
interface IProps {}

const Advanced = (props: IProps) => {
  return (
    <section className="advanced">
      <h2>Close my account</h2>
      <div className="warning">
        <BsFillExclamationSquareFill className="icons" />
        <span>You won't be able recover your account after this action</span>
      </div>
      <button className="btn btn-primary">I want close my Account</button>
    </section>
  )
}

export default Advanced
