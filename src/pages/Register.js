import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { app, db, storage} from "../firebase";
import { doc, setDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    


    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const userPassword = e.target[2].value

        console.log(e.target[0].value)
    
        const auth = getAuth()

        try {
            const res = await createUserWithEmailAndPassword(auth, email, userPassword);
            
const storageRef = ref(storage, displayName);




  updateProfile(auth.currentUser, {
    displayName: displayName
  }) .then(() => {
    console.log("updated fine")
  }).catch((error) => {
    console.log(error)
  })


  await setDoc(doc(db, "users", res.user.uid),{
    uid: res.user.uid,
    displayName,
    email
  })

  await setDoc(doc(db, "userchats", res.user.uid), {})
       navigate("/")   


        } catch {
            setError(true)
        }      
      
    }   
    
    return (
        <div className="formContainer">
        <div className="formWrapper">
        <span className="title">Register</span>
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" placeholder="name"></input>
            <input id="emailID" type="email" placeholder="email"></input>
            <input type="password" placeholder="password"></input>
            <button className="registerButton">Register</button>
        </form>
        <p>If you do have an account, <Link to="/signIn">click here</Link></p>
        </div>
    </div>
    )
}

export default Register