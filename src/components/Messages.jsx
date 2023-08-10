import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'
import { Message } from './Message'


export const Messages = () => {
  const [messages,setmessages] = useState([]);
  const {data} = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setmessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);


  return (
    <div className='Messages'>
        {messages.map(m=>(
           <Message message={m} key={m.id}/>
        ))}
      
    </div>
  )
}
