import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'
import Sidebar from './Sidebar'


export default function AdminLayout() {

  return (
        <>
        <Navbar/>
        <Sidebar />
        <div className='ml-0 lg:ml-[250px] lg:pt-[5rem] bg-gray-100 dark:bg-gray-900 transition duration-300 min-h-[100vh] px-4'><Outlet/></div>
        </>
  )
}