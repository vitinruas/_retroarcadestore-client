import React, { ReactElement } from 'react'

// components
import Content from './Content/Content'
import Footer from './Footer/Footer'
import Header from './Header/Header'

interface IProps {
  children: ReactElement
}

const Layout = ({ children }: IProps) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  )
}

export default Layout
