import React from 'react'
import {signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate ,Link} from 'react-router-dom';
import { useState } from 'react';
import { auth } from "../firebase";


export const Login = () => {

  const [err,seterr] = useState();
  const navigate = useNavigate();
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;


    try{
     await signInWithEmailAndPassword(auth, email, password);

     navigate("/");

    }catch(err){
       seterr(true);
    }

      
    
  }

  return (
    <div className='formContainer'>
        <div className='formwrapper'>
            <span className='logo'>Chat App</span>
            <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
  
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <button>Sign in</button>
                {err && <span>Something Went Wrong</span>}
            </form>
            <p>You do have an account?<Link to="/Register">Register</Link> </p>
        </div>
    </div>
  )
}

export default Login;
