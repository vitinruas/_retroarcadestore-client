import React from 'react'

// styles
import './Modal.css'

// contexts
import { useModalContext } from '../../contexts/modal-context'

interface IProps {}

const Modal = ({}: IProps) => {
  // contexts
  const { modalState } = useModalContext()
  return <section className="modal">{modalState.reactComponent}</section>
}

export default Modal
