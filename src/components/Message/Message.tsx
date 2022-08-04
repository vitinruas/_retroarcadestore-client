import React from 'react'

// styles
import './Message.css'

// interfaces
interface IProps {
  messageBody: string | null
  styleClass: string | null
}

const Message = ({ messageBody, styleClass }: IProps) => {
  if (messageBody && styleClass) {
    return <div className={`msg ${styleClass}`}>{messageBody}</div>
  }
  return <></>
}

export default Message
