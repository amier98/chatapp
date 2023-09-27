import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";


const Navi = () => {
    const {currentUser} = useContext(AuthContext)

    console.log(currentUser)
    
    return (
        <div className="naviBar">
            <div className="userDetails">
                <span>{currentUser.displayName}</span>
                <button className="buttonSignout" onClick={() => signOut(auth)}>Sign out</button>
            </div>
        </div>
    )
}

export default Navi