// import React from 'react'
// import { useState } from 'react'
// import { 
//     collection,
//     query,
//     where,
//     getDocs, 
//     setDoc, 
//     doc,
//     updateDoc, 
//     serverTimestamp,
//     getDoc,
//    } from "firebase/firestore";
// import {db} from "../firebase";
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// export const Search = () => {

//    const [username,setusername] = useState("");
//    const [user,setuser] = useState(null);
//    const [err,seterr] = useState(false);
//    const {currentuser} = useContext(AuthContext);


   
//    const handlesearch = async () =>{
//         const q = query(collection(db,"users"),where("displayName","==",username));

//         try{
//           const querySnapshot = await getDocs(q);
//           querySnapshot.forEach((doc) => {
//             setuser(doc.data());
//           }); 

//         }catch(err){
//           seterr(true);
//         } 
        
        
//    };

//    const handlekey = e=>{
//       e.code === "Enter" && handlesearch();
//    };

//    const handleselect = async () =>{
      
//        const combinedId =  currentuser.uid > user.uid ? currentuser.uid + user.uid : user.uid + currentuser.uid;
//       try{
//         const res = await getDoc(doc(db,"chats",combinedId));
        

//         console.log(res);
        
//         if(!res.exists()){
//           console.log("agraz");
          
//           await setDoc(doc(db,"chats",combinedId),{messages:[]});//notice
          

//            await updateDoc(doc(db,"userChats",currentuser.uid),{
//              [combinedId+".userInfo"]:{
//                 uid: user.uid,
//                 displayName: user.displayName,
//                 photoURL: user.photoURL,
//              },
//              [combinedId+".date"]:serverTimestamp()
//            });
           
//            await updateDoc(doc(db,"userChats",user.uid),{
//              [combinedId+".userInfo"]:{
//                 uid: currentuser.uid,
//                 displayName: currentuser.displayName,
//                 photoURL: currentuser.photoURL,
//              },
//              [combinedId+".date"]:serverTimestamp()
//            });

//         }
        
//       }catch(err){

//       }

//      setuser(null);
//      setusername("");
       
//    };

//   return (
//     <div className="Search">
//          <div className="searchform">
//            <input type="text" placeholder='Find a User' 
           
//            onKeyDown={handlekey}
//            onChange={(e)=>setusername(e.target.value)}
//            value = {username}
           
//            />
//          </div>
//          {err && <span>user not found</span>}
//          {user && <div className="userchat" onClick={handleselect}>
          
//           <img src={user.photoURL} alt="" />
//           <div className="userchatinfo">
//              <span>{user.displayName}</span>
//           </div>

//          </div>}
//     </div>
//   );
// };

// export default Search;


import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
export const Search = () => {
  const [username, setusername] = useState("");
  const [user, setuser] = useState(null);
  const [err, seterr] = useState(false);

  const { currentuser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setuser(doc.data());
      });
    } catch (err) {
      seterr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentuser.uid > user.uid
        ? currentuser.uid + user.uid
        : user.uid + currentuser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userchats", currentuser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userchats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentuser.uid,
            displayName: currentuser.displayName,
            photoURL: currentuser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setuser(null);
    setusername("")
  };
  return (
    <div className="Search">
      <div className="searchform">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setusername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userchat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userchatinfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;