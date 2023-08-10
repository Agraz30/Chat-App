import React from 'react'
import { Chat } from '../components/Chat'
import { Sidebar } from '../components/Sidebar'

export const Home = () => {
  return (
    <div className="Home">
        <div className="Container">
           <Sidebar/>
           <Chat/>
        </div>
    </div>
  )
}
