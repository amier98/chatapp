import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";

const Input = () => {
    //sending a text
    //recieving a text
    const [text, setText] = useState("")
    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)



    const handleSend = async () => {
    await updateDoc(doc(db, "chats", data.chatID), {
        messages: arrayUnion({
            id: uuid(),
            senderId:currentUser.uid,
            date:Timestamp.now(),
            message: text,
        })
    })
    //this is for the current user
    await updateDoc(doc(db, "userchats", currentUser.uid), {
        [data.chatID + ".lastmessage"]: {
            text,
        },
        [data.chatID + ".date"]: serverTimestamp(),
    })
    //this is for the other user
    await updateDoc(doc(db, "userchats", data.user.uid), {
        [data.chatID + ".lastmessage"]: {
            text,
        },
        [data.chatID + ".date"]: serverTimestamp(),
    })
    setText("")

    }

    return (
        <div className="inputClass">
            <input className="inputSearch" type="text" placeholder="Type in message..." onChange={(e) => setText(e.target.value)} value={text}></input>
            <div className="buttonSend">
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input