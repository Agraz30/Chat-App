import React, { useContext, useState } from 'react'
import Img from "../img/img.png"
import Attach from "../img/attach.png"
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


export const Inputt = () => {
  
  const [text,setext] = useState("");
  const [img,setimg] = useState(null);

  const {currentuser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);


  const handlesend = async ()=>{
     
    if(img){
      const storageRef = ref(storage,uuid());
      
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(

        (error) => {
          seterr(true);
        }, 
        () => {
      
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateDoc(doc(db,"chats",data.chatId),{
              messages:arrayUnion({
                id : uuid(),
                text,
                senderId:currentuser.uid,
                date : Timestamp.now(),
                img : downloadURL
              }),
            });

          });
        }
      );
         
    }else{
        await updateDoc(doc(db,"chats",data.chatId),{
          messages:arrayUnion({
            id : uuid(),
            text,
            senderId:currentuser.uid,
            date : Timestamp.now(),


          }),
        });
    }

    await updateDoc(doc(db,"userchats",currentuser.uid),{
      [data.chatId+".lastMessage"]:{
        text,
      },
      [data.chatId+".date"]:serverTimestamp(),
    });

    await updateDoc(doc(db,"userchats",data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text,
      },
      [data.chatId+".date"]:serverTimestamp(),
    });

    setext(" ");
    setimg(null);
  }; 
  return (
    <div className="Inputt">
      <input type="text" placeholder='Type something' onChange={e=>setext(e.target.value)} value={text}/>
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{display:"none"}} id="file" onChange={e=>setimg(e.target.files[0])}/>
        <label htmlFor="file">
            <img src={Img} alt="" />
        </label>
        <button onClick={handlesend}>Send</button>
      </div>
    </div>
  )
}
