import React from 'react'

// styles
import './Message.css'

// interfaces
interface IProps {
  message: string | null | undefined
  style: string | null | undefined
}

const Message = ({ message, style }: IProps) => {
  if (message && style) {
    return <div className={`msg ${style}`}>{message}</div>
  }
  return <></>
}

export default Message
