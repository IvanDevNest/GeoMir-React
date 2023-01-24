import { useContext, useEffect } from "react";
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom'
import { useState } from 'react';


export default function Header() {
    let { authToken, setAuthToken } = useContext(UserContext);
    let [error, setError] = useState("");
    let [user, setUser] = useState("");
    let [ roles, setRoles] = useState([]);

useEffect(()=>{


    
    fetch("https://backend.insjoaquimmir.cat/api/user", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",             'Authorization': 'Bearer '  + authToken,

          },
          method: "GET",
            })
            .then((data) => data.json())
            .then((resposta) => {
              console.log(resposta);
              if (resposta.success === true) {

                    setUser(resposta.user.name)
                    setRoles(resposta.roles)
                
                    
      
              }
              else {
                setError(resposta.message)
              }
            })
            .catch((data) => {
              console.log(data);
              alert("Catchch");
            });
        },[]);  

    const sendLogout = (e) => {
        e.preventDefault();
        fetch("https://backend.insjoaquimmir.cat/api/logout", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",             'Authorization': 'Bearer '  + authToken,

          },
          method: "POST",
            })
            
          .then((data) => data.json())
          .then((resposta) => {
            console.log(resposta);
            if (resposta.success === true) {
              setAuthToken("");
    
    
            }
            else {
              setError(resposta.message)
            }
          })
          .catch((data) => {
            console.log(data);
            alert("Catchch");
          });
    
      };
    
    

    return (
        <>
            <div>
                estoy full bugueado
                Token: <strong>{authToken}</strong>
            </div>

            <div>
                <Link to="/places">Cosess </Link>
                <Link to="/posts">Enlloc </Link>
                <Link to="/about">About </Link>
            </div>
            <button
          onClick={(e) => {
            sendLogout(e);
          }}
        >
          { roles.map (  (v)=> ( 
          <span key={v}> {v} </span>
) ) } Logout - {user}      </button>
            
        </>
    );
}