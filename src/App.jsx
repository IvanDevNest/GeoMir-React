import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { UserContext } from "./userContext";
import './App.css'
import LoginRegister from './Auth/LoginRegister'
import Header from './Layout/Header'
import { Routes, Route } from "react-router-dom";
import About from './About';
import Footer from "./Layout/Footer"




function App() {
  let [authToken, setAuthToken] = useState("");


  return (
    <>
    <UserContext.Provider
      value={{ authToken, setAuthToken }}
      // { authToken, setAuthToken } equival a  { authToken: authToken, setAuthToken:setAuthToken}
    >
      
      {authToken ? (
        <>
          <Header/>
            <Routes>
              <Route path="/" element={<About />}/>
              <Route path="/about" element={<About />} />
            </Routes>
            <Footer/>

        </>
      ) : (
        <LoginRegister />
      )}
    </UserContext.Provider>
  </>
    );
    
}

export default App
