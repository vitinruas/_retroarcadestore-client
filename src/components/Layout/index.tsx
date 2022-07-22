import React, { ReactElement } from 'react'

// styles
import './Layout.css'

// components
import Main from './Main/Main'
import Footer from './Footer/Footer'
import Header from './Header/Header'

interface IProps {
  children: ReactElement
}

const Layout = ({ children }: IProps) => {
  return (
    <div className="layout">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  )
}

export default Layout
