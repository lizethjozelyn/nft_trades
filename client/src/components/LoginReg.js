import { Fragment, useState } from 'react';
import logo from './../logo.svg';
//import './FileUpload.css'
import { Link} from "react-router-dom";
import Axios from "axios";
function LoginReg() {

	const [username, setUsername] = useState('');
	const [filename, setFilename] = useState('Choose File');

	const onChange = e => {
		setUsername(e.target.value);
	
		console.log(username);
	};

	
	const login = () => {
		
		Axios.post("http://localhost:3305/login", {
			username: username,
			password: "Passwordle",
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
		<div className="custom-file">
			<div className="container">
				<section className="cred">

					<input type="text" onChange={onChange} />
					<input type="text" onChange={onChange} />
					<button onClick={login}> Login </button>
					<button onClick={test}> test </button>
				</section>

			</div>
			      {username &&
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>

					<p>{username}</p>
          </div>
        </div>
      }
		</div>
	);
}
				/*
				Add props that allow for resizing for dashboard
				<img src={logo} className="App-logo" alt="logo" Style="width:10%" />*/


export default LoginReg;


