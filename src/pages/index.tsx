import React from 'react'
import { Route, Routes } from 'react-router-dom'

// pages
import Error404 from './errors/404/Error404'
import Home from './Home/Home'
import Account from './Client/Account/Account'
import Profile from './Client/Account/Profile/Profile'
import { Navigate } from 'react-router-dom'
import Address from './Client/Account/Address/Address'
import { useAuthContext } from '../contexts/auth-context'

type IProps = {}

const Pages = (props: IProps) => {
  const { authState } = useAuthContext()
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/account"
          element={
            authState.isLogged ? (
              <Navigate to={'/account/profile'} />
            ) : (
              <Navigate to={'/'} />
            )
          }
        />
        <Route
          path="/account/profile"
          element={
            authState.isLogged ? (
              <Account children={<Profile />} />
            ) : (
              <Navigate to={'/'} />
            )
          }
        />
        <Route
          path="/account/address"
          element={
            authState.isLogged ? (
              <Account children={<Address />} />
            ) : (
              <Navigate to={'/'} />
            )
          }
        />
        <Route
          path="/account/changePassword"
          element={
            authState.isLogged ? (
              <Account children={<Address />} />
            ) : (
              <Navigate to={'/'} />
            )
          }
        />

        <Route
          path="/account/advanced"
          element={
            authState.isLogged ? (
              <Account children={<Address />} />
            ) : (
              <Navigate to={'/'} />
            )
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  )
}

export default Pages
