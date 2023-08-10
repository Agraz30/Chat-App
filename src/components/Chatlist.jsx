import { doc, onSnapshot } from 'firebase/firestore';
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';

export const Chatlist = () => {

  const[chats,setchats] = useState([]);
  const {currentuser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)

  useEffect(() => {
    const getchats = () => {
      const unsub = onSnapshot(doc(db, "userchats", currentuser.uid), (doc) => {
        setchats(doc.data());

      });

      return () => {
        unsub();
      };
    };

    currentuser.uid && getchats();
  }, [currentuser.uid]); 

  const handleSelect = (u)=>{
    dispatch({type:"CHANGE_USER",payload:u});
  };


  return (
    <div className="Chatlist">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userchat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userchatinfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );  
};
