import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { UserContext } from "./userContext";
import './App.css'
import LoginRegister from './Auth/LoginRegister'
import Header from './Layout/Header'
import { Routes, Route } from "react-router-dom";
import About from './About';
import Footer from "./Layout/Footer";
import Place from "./Places/Place";
import PlaceAdd from "./Places/PlaceAdd";
import PlaceEdit from "./Places/PlaceEdit";
import PlaceGrid from "./Places/PlaceGrid";
import PlaceList from "./Places/PlaceList";








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
              <Route path="/places/:id" element={<Place />} />
              <Route path="/places/add" element={<PlaceAdd />} />
              <Route path="/places/edit/:id" element={<PlaceEdit />} />
              <Route path="/places/grid" element={<PlaceGrid />} />
              <Route path="/places/list" element={<PlaceList />} />



              
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
