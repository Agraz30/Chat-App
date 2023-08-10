import React from 'react'
import { Chatlist } from './Chatlist'
import { Navvbar } from './Navvbar'
import { Search } from './Search'



export const Sidebar = () => {
  return (
    <div className="Sidebar">
      <Navvbar/>
      <Search/>
      <Chatlist/>


    </div>
  )
}
