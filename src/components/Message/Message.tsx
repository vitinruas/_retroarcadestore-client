import React from 'react'

// styles
import './Message.css'

// interfaces
interface IProps {
  messageBody: string | null | undefined
  styleClass: string | null | undefined
}

const Message = ({ messageBody, styleClass }: IProps) => {
  if (messageBody && styleClass) {
    return <div className={`msg ${styleClass}`}>{messageBody}</div>
  }
  return <></>
}

export default Message
