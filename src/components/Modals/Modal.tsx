import React from 'react'
import { useModalContext } from '../../contexts/modal-context'

// styles
import './Modal.css'

interface IProps {}

const Modal = ({}: IProps) => {
  const { modalState } = useModalContext()
  return <section className="modal">{modalState.reactComponent}</section>
}

export default Modal
