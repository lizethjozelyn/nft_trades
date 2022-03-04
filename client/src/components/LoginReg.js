import { Fragment, useState } from 'react';
import logo from './../logo.svg';
import './LoginReg.css'
import { Link} from "react-router-dom";
import Axios from "axios";
function LoginReg() {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const onChange = e => {
		setUsername(e.target.value);
	
		console.log(username);
	};

	//prob use https to send password or something idk
	const login = () => {
		
		Axios.post("http://localhost:3305/login", {
			username: username,
			password: "Password",
		}).then((response) => {
			console.log(response);
		});	

		
	}
	const test = () => {	

		Axios.get("http://localhost:3305/test").then((response) => {
			console.log(response);
		});
		
	}
	
	
	
	
	
	return(
           <div className="login-box">
                   <div className="login-container">
                       <section className="cred">
                           <h1>Account Login</h1>
                           <p>Username</p>
                           <input className="input-area" type="text" name= "email" onChange={e => {setUsername(e.target.value);} } />
                           <p>Password</p>
                           <input className="input-area" type="password" name= "password" onChange={e => {setPassword(e.target.value);} } />
                           <button className="input-btn" onClick={login}> Login </button>
                           <button className="input-btn" onClick={test}> Register </button>
                       </section>
           </div>
           </div>
	);
}
			/* used to show username was grabbed
			      {username &&
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>

					<p>{username}</p>
          </div>
        </div>
      }*/
				/*
				Add props that allow for resizing for dashboard
				<img src={logo} className="App-logo" alt="logo" Style="width:10%" />*/


export default LoginReg;


