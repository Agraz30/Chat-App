import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const Navvbar = () => {
   const {currentuser} = useContext(AuthContext);

   console.log(currentuser);

  return (
    <div className='Navvbar'>
      <div className="logo">Chat App</div>
      <div className="user">
         <img src={currentuser.photoURL} alt="no pic" />
         
         <span>{currentuser.displayName}</span>
         <button onClick={()=>signOut(auth)}>logout</button>
      </div>
    </div>
  )
}
