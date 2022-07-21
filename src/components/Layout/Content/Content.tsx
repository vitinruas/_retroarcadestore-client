import React, { ReactElement } from 'react'

interface IProps {
  children: ReactElement
}

const Content = ({ children }: IProps) => {
  return <section>{children}</section>
}

export default Content
