/* eslint-disable no-unused-vars */
import React from 'react'
import { Outlet } from 'react-router-dom'
import ButtonAppBar from '../Components/Navbar'

export default function MainLayout() {
  return (
    <>
    <ButtonAppBar />
    <Outlet />
    </>
  )
}
