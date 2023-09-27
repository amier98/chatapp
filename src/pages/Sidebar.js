import React from "react";
import Navi from "./Navi";
import SearchUser from "./SearchUser";
import Chat from "./Chat";
import Chats from "./Chats";

const Sidebar = () => {
    return (
        <div className="sideBar">
            <Navi/>
            <SearchUser/>
            <Chats/>
        </div>
    )
}

export default Sidebar