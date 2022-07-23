import React from 'react'
import { useModalContext } from '../../contexts/modal-context'

// styles
import './Modal.css'

interface IProps {}

const Modal = ({}: IProps) => {
  const { config } = useModalContext()
  return <section className="modal">{config.reactComponent}</section>
}

export default Modal
