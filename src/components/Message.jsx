import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

export const Message = ({message}) => {
  // console.log(message);

  const {currentuser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  return ( 
    <div className={`Message ${message.senderId===currentuser.uid && "owner"}`}>   
      <div className="messageinfo">
        <img 
         src= {
           message.senderId===currentuser.uid?
           currentuser.photoURL:data.user.photoURL
        
        
        
          } 
          alt="" 
        
        
        />
        <span>just now</span>
      </div>
      <div className="messagecontent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}
