import React, { useContext, useState } from "react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where} from "firebase/firestore"
import {db} from "../firebase"
import {AuthContext} from "../context/AuthContext"

const SearchUser = () => {
    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [error, setError] = useState(false)

    const {currentUser} = useContext(AuthContext)

    console.log(user)

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", username))
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUser(doc.data())
        })
    
    
    };

    const handleKey = e=> {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async () => {
        const combinedID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

        console.log(combinedID)
        try {
            const res = await getDoc(doc(db, "chats", combinedID))
        
            if (!res.exists()) {
                //create a new chat between two users
                await setDoc(doc(db, "chats", combinedID), {messages: [] })
                //this updates the document data
                await updateDoc(doc(db, "userchats", currentUser.uid), {
                    [combinedID+".chatUserInfo"]: {
                        uid:user.uid,
                        displayName:user.displayName
                    },
                    //this adds the date
                    [combinedID+".date"]: serverTimestamp()
                });

                await updateDoc(doc(db, "userchats", user.uid), {
                    [combinedID+".chatUserInfo"]: {
                        uid:currentUser.uid,
                        displayName:currentUser.displayName
                    },
                    [combinedID+".date"]: serverTimestamp()
                })
           
            }
        } catch(error) {
            setError(true)
        }

        setUser(null)
        setUsername("")

        
    }

    return (
        <div className="searchContainer">
            <div className="formSearch">
                <input type="text" placeholder="enter user..." onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} value={username}/>
            </div>
            {user && <div className="chatUser" onClick={handleSelect}>
                <div className="chatUserInfo">
                <span className="userFont">{user.displayName}</span>
                </div>
            </div>}
        </div>
    )
}

export default SearchUser