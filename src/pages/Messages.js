import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Messages = () => {

    const { data } = useContext(ChatContext)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const unSub = onSnapshot(doc(db,"chats", data.chatID), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return ()=>{
            unSub()
        }
    }, [data.chatID])

    return (
        <div className="messages">
            {messages.map(m =>(
                <Message message={m} key={m.id}/>
            ))}
        </div>
    )
}

export default Messages