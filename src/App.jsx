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
import PlacesGrid from "./Places/PlacesGrid";
import PlaceGrid from "./Places/PlaceGrid";

import PlacesList from "./Places/PlacesList";
import PlaceMenu from "./Places/PlaceMenu";

import PlaceList from "./Places/PlaceList";
import Post from "./Posts/Post";
import PostAdd from "./Posts/PostAdd";
import PostEdit from "./Posts/PostEdit";
import PostsGrid from "./Posts/PostsGrid";
import PostsList from "./Posts/PostsList";








function App() {
  let [authToken, setAuthToken] = useState("");
  let [usuari, setUsuari] = useState("");
  


  return (
    <>
    <UserContext.Provider value= { { usuari, setUsuari,authToken,setAuthToken }}>

      
      {authToken ? (
        <>
          <Header/>
            <Routes>
              <Route path="/" element={<About />}/>
              <Route path="/about" element={<About />} />
              <Route path="/places/:id" element={<Place />} />
              <Route path="/places/add" element={<PlaceAdd />} />
              <Route path="/places/edit/:id" element={<PlaceEdit />} />
              <Route path="/places/grid" element={<PlacesGrid />} />
              <Route path="/places/list" element={<PlacesList />} />
              <Route path="/places/grid" element={<PlaceGrid />} />
              <Route path="/places/list" element={<PlaceList />} />
              
              <Route path="/posts/list" element={<PostsList />} />
              <Route path="/posts/grid" element={<PostsGrid />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route path="/posts/add" element={<PostAdd />} />
              <Route path="/posts/edit/:id" element={<PostEdit />} />
              
             
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
