import { Fragment, useState } from 'react';
import logo from './../logo.svg';
import './LoginReg.css'
import { Link } from "react-router-dom";
import Axios from "axios";
function LoginReg() {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [text, setText] = useState('Login or Register');
	const [loginPageDisplay, setLoginPage] = useState('flex')
	const [userDisplay, setUserPage] = useState('none')
	const [images, setImages] = useState([])

	const onChange = e => {
		setUsername(e.target.value);

		console.log(username);
	};


	//prob use https to send password or something idk
	const login = () => {
		Axios.post("http://localhost:3305/login", {
			username: username,
			password: password,
		}).then((response) => {
			console.log(response);
			if (response.data) {
				setText("Logged In.")
				setLoginPage('none')
				console.log(username)
				Axios.post("http://localhost:3305/getimage", {
					username: username,
				}).then((response) => {
					console.log(response);
					setImages(response.data)
					setUserPage('block')
				});
			}
			else { setText("Incorrect Details") }
		});


	}


	const test = () => {

		Axios.post("http://localhost:3305/register", {
			username: username,
			password: password,
		}).then((response) => {
			console.log(response);
			if (response.data) { setText("Account Created") }
			else { setText("Account Exists") }
		});

	}

	return (
		<Fragment>
			<div className="login-box" style={{ display: loginPageDisplay }}>
				<div className="login-container">
					<section className="cred">
						<h1>Account Login</h1>
						<p>Username</p>
						<input className="input-area" type="text" name="email" onChange={e => { setUsername(e.target.value); }} />
						<p>Password</p>
						<input className="input-area" type="password" name="password" onChange={e => { setPassword(e.target.value); }} />
						<h3 className='result'>{text}</h3>
						<button className="input-btn" onClick={login}> Login </button>
						<button className="input-btn" onClick={test}> Register </button>
					</section>
				</div>
			</div>
			<div className="user-page" style={{ display: userDisplay }}>User Profile
				{images.length > 0 ? (
					<div className="userimages">
						{images.map((value, i) => {
							return (
								<div className="user-image" key={i}>
									<img src={value.url} width="200" height={200}></img>
								</div>
							);
						})}
					</div>
				) : (
					<p> No images </p>
				)}
			</div>
		</Fragment>

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


