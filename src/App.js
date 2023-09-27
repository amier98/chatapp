import logo from './logo.svg';
import './App.css';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { useContext, useState } from 'react';
import { AuthContext } from './context/AuthContext';





function App() {
  const {currentUser} = useContext(AuthContext)
  
const CheckUser = ({children}) => {
  if (!currentUser) {
    return <Navigate to="/signIn"/>
  }

  return children
}

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<CheckUser>
          <Home/>
        </CheckUser>
        }/>
          <Route path='signIn' element={<SignIn/>}/>
          <Route path='register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
