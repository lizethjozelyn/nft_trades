import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home";
import Store from "./Store";
import Community from "./Community";
import Profile from "./Profile";
import LoginReg from "../components/LoginReg";

function User() {
    console.log("user page reached");
    const urlArray = window.location.pathname.split("/");
    console.log(urlArray);
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

        </>
      );
}
export default User;