import React from 'react'

// styles
import './Error404.css'

interface IProps {}

const Error404 = ({}: IProps) => {
  return (
    <section className="error-404">
      <h1>Error 404</h1>
      <span>You shouldn't be here</span>
    </section>
  )
}

export default Error404
