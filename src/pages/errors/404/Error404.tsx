import React from 'react'

// styles
import './Error404.css'

interface IProps {}

const Error404 = ({}: IProps) => {
  return (
    <section className="error-404">
      <h1>Error 404</h1>
      <span>?</span>
      <span>Você não deveria estar aqui!</span>
    </section>
  )
}

export default Error404
