import React, { useContext } from "react";
import { IconContext } from "react-icons";
import { AiOutlineUserAdd } from "react-icons/ai";
import {AiOutlineEllipsis} from "react-icons/ai";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {

    const { data } = useContext(ChatContext)

    return (
        <div className="chatPos">
            <div className="infoChat">
                <span>{data.user.displayName} </span>
                <div>
                <IconContext.Provider value={{className: "shared-class", size: 30}}>
                <AiOutlineUserAdd/>
                <AiOutlineEllipsis/>
                </IconContext.Provider>
                </div>          
            </div>
            <Messages/>
            <Input></Input>
        </div>
    )
}

export default Chat