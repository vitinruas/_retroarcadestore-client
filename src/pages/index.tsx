import React from 'react'
import { Route, Routes } from 'react-router-dom'

// pages
import Error404 from './errors/404/Error404'
import Home from './Home/Home'
import Account from './Client/Account/Account'

type IProps = {}

const Pages = (props: IProps) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  )
}

export default Pages
