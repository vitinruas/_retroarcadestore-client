import React from 'react'
import { useModalContext } from '../../contexts/modal-context'

// styles
import './Modal.css'

interface IProps {}

const Modal = ({}: IProps) => {
  const { config, dispatch } = useModalContext()
  console.log(config)
  return <section className="modal">{config.reactComponent}</section>
}

export default Modal
