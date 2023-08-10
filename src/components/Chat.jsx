import React, { useContext } from 'react'
import Cam from "../img/cam.png"
import Add from "../img/add.png"
import More from "../img/more.png"
import { Messages } from './Messages'
import { Inputt } from './Inputt'
import { ChatContext } from '../context/ChatContext'


export const Chat = () => {
  const {data} = useContext(ChatContext)
  return (
    <div className='Chat'>
        <div className="chatinfo">
           <span>{data.user?.displayName}</span>
           <div className="chaticons">
             <img src={Cam} alt="" />
             <img src={Add} alt="" />
             <img src={More} alt="" />
           </div>
        </div>
        <Messages/>
        <Inputt/>
    </div>
  )
}
