import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

// pages
import Error404 from './Errors/404/Error404'
import Home from './Home/Home'
import Account from './Client/Account/Account'
import Profile from './Client/Account/Profile/Profile'
import Address from './Client/Account/Address/Address'
import ChangePassword from './Client/Account/ChangePassword/ChangePassword'
import Advanced from './Client/Account/Advanced/Advanced'

// context
import { useAuthContext } from '../contexts/auth-context'

interface IProps {}

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
              <Account children={<ChangePassword />} />
            ) : (
              <Navigate to={'/'} />
            )
          }
        />

        <Route
          path="/account/advanced"
          element={
            authState.isLogged ? (
              <Account children={<Advanced />} />
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
