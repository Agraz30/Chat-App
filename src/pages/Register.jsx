import React from 'react'
import { useState } from 'react';
import Add from "../img/addAvatar.png"
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth , storage , db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { async } from '@firebase/util';
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate ,Link} from 'react-router-dom';

export const Register = () => {
  
  const [err,seterr] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);

      

      const storageRef = ref(storage,displayName);
      
      const uploadTask = uploadBytesResumable(storageRef, file);
      
 
      uploadTask.on(

        (error) => {
          seterr(true);
        }, 
        () => {
      
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(res.user,{
                displayName,
                photoURL : downloadURL,
            });
            await setDoc(doc(db,"users",res.user.uid),{
              uid : res.user.uid,
              displayName,
              email,
              photoURL:downloadURL,
            });

            await setDoc(doc(db,"userchats",res.user.uid),{}); 
            navigate("/");

          });
        }
      );

    }catch(err){
       seterr(true);
    }

      
    
  }





  return (
    <div className='formContainer'>
        <div className='formwrapper'>
            <span className='logo'>Chat App</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter your Name'/>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <input style={{display:"none"}} type="file" id="file"/>
                <label  htmlFor="file">
                    <img src={Add} alt=""/>
                    <span>Add image</span>
                </label>
                <button>Sign up</button>
                {err && <span>Something Went Wrong</span>}
            </form>
            <p>You do have an account? <Link to="/Login">Login</Link></p>
        </div>
    </div>
  )
}
