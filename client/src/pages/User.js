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
    console.log(urlArray[2]); 

    const getImages = () => {
        console.log("get img")

        Axios.post("http://localhost:3305/getimage", {
                username: urlArray[2],
            }).then((response) => {
                console.log(response);
                setData(response.data)
            });
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
            {userData.length > 0 ? (
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
            )}
            </div>
        </>
      );
}
export default User;