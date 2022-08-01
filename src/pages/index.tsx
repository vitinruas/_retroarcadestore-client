import React from 'react'
import { Route, Routes } from 'react-router-dom'

// pages
import Error404 from './errors/404/Error404'
import Home from './Home/Home'
import Account from './Client/Account/Account'
import Profile from './Client/Account/Profile/Profile'
import { Navigate } from 'react-router-dom'
import Address from './Client/Account/Address/Address'

type IProps = {}

const Pages = (props: IProps) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Navigate to={'/account/profile'} />} />
        <Route
          path="/account/profile"
          element={<Account children={<Profile />} />}
        />
        <Route
          path="/account/address"
          element={<Account children={<Address />} />}
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  )
}

export default Pages
