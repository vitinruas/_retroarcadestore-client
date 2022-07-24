import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Error404 from './errors/404/Error404'

// pages
import Home from './Home/Home'

type IProps = {}

const Pages = (props: IProps) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  )
}

export default Pages
