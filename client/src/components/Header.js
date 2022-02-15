import logo from './../logo.svg';
import './Header.css'
import { Link} from "react-router-dom";
function Header() {

	return(
		<div className="header">
			<div className="container flex">
				<h1 className="logo">temp</h1>
				<nav>
					<ul>
						<li><Link to="/" >Home</Link></li>
						<li><Link to="/store" >Store</Link></li>
						<li><Link to="/community" >Community</Link></li>
						<li><Link to="/profile" >Profile</Link></li>
					</ul>
				</nav>
				

			</div>
		</div>
	);
}
				/*
				<img src={logo} className="profile" alt="logo" />
				<img src={logo} className="App-logo" alt="logo" Style="width:10%" />*/


export default Header;


