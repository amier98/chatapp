import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {

    const [error, setError] = useState(false)
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = e.target[0].value;
        const password = e.target[1].value;

        console.log(email)
        console.log(password)
        
        const auth = getAuth()

        try {
           await signInWithEmailAndPassword(auth, email, password)
           navigate("/")

        } catch {
            setError(true)
        }      
     
    } 

    return (
        <div className="formContainer">
            <div className="formWrapper">
            <span className="title">Login</span>
            <form className="form" onSubmit={handleSubmit}>
                <input name="email"  type="email" placeholder="email"></input>
                <input name="password" type="password" placeholder="password"></input>
                <button className="registerButton">Sign In</button>
            </form>
            <p>If you do not have a account, <Link to="/register">click here</Link></p>
            </div>
        </div>
    )
}

export default SignIn