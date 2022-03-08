import { Route, Routes } from "react-router-dom";
import { useEffect,useState } from "react";
import Axios from "axios";
import Home from "./Home";
import Store from "./Store";
import Community from "./Community";
import Profile from "./Profile";
import LoginReg from "../components/LoginReg";
import { FaImages } from "react-icons/fa";

function User() {
    const [userData, setData] = useState(0);
    useEffect(() => {
        // ⬇ This calls my get request from the server
        
        getImages();
      }, []);

    const urlArray = window.location.pathname.split("/");
    
    const word = urlArray[3].replace('%20', ' ');
    console.log(word); 
    const getImages = () => {
        console.log("get img")
        if(urlArray[2] === "u"){
            Axios.post("http://localhost:3305/getimage", {
                    username: urlArray[3],
                }).then((response) => {
                    console.log(response);
                    setData(response.data);
                });
            }
        if(urlArray[2] === "g"){
            console.log("this is a group"); 
            Axios.post("http://localhost:3305/getgroup", {
                    group: urlArray[3],
                }).then((response) => {
                    console.log(response);
                    setData(response.data);
                });
        }
        if(urlArray[2] === "n"){
            console.log('this is for image names');
            Axios.get("http://localhost:3305/search/name").then((response) => {
                    for(let i = 0; i < response.data.length; i++){
                        // console.log(response.data[i].image_name);
                        if(response.data[i].image_name === word){
                            setData(response.data[i]);
                            console.log(response.data[i].url);
                        }
                    }

                });  
        }
    }

    return (
        <>
        <div className="App">
            <Routes>
                
                <Route path='/' element={ <Home /> }/>
                <Route path='/profile' element={ <Profile /> }/>
                <Route path='/store' element={ <Store /> } />
                <Route exact path='/community' element={ <Community /> } />
                <Route path='/login' element={ <LoginReg /> } />
            </Routes>
        </div>
        <div className="community-user">
            {urlArray[2] === "n" ? (
                <div className="community-user-images">
                        
                    <div className="community-user-image">
                        <img src={userData.url}></img>
                    </div>
                
                </div>
            ) : (
                userData.length > 0 ? (
                    <div className="community-user-images">
                        
                        {userData.map((value, i) => {
                            return (
                                <div className="community-user-image" key={i}>
                                    <img src={value.url}></img>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p> No images </p>
                )
            )
            }
            </div>
        </>
      );
}
export default User;