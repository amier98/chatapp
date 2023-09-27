import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
 //the chat will start as an empty array
  const [chats,setChats] = useState([])

  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)

  console.log(currentUser.uid)

  useEffect(() => {
    const getChats = () => {
    
    
    const unsub = onSnapshot(doc(db, "userchats", currentUser.uid), (doc) => {
      setChats(doc.data())
    });

    return () => {
      unsub();
    }
  }
  currentUser.uid && getChats()

  },[currentUser.uid])



  const handleSelect = (u) => {
    dispatch({type:"CHANGE_USER", payload: u})
  }

 return Object.entries(chats)?.map(chat=> {
    return (
      <div className="chatBox"key={chat[0]} onClick={()=>handleSelect(chat[1].chatUserInfo)}>
        <div className="chatUser">
          <span className="userFont">{chat[1].chatUserInfo.displayName}</span>
          <p>{chat[1].lastmessage?.text}</p>
        </div>
      </div>
    );
 })
}

export default Chats