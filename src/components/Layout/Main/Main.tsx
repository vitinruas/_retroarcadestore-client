import React, { ReactElement } from 'react'

// styles
import './Main.css'

interface IProps {
  children: ReactElement
}

const Main = ({ children }: IProps) => {
  return <section className="main">{children}</section>
}

export default Main
