<<<<<<< HEAD
import './OptionMenu.css'
import Axios from "axios";
import { Link} from "react-router-dom";
function OptionMenu({userMode, nameMode, groupMode}) {
	const test = () => {	

			console.log("HHHHHH");

		
	}
	return(
		<div className="option-menu">
			<div className="container flex">

				<nav>
					<ul>
						<li><a onClick={nameMode}>User</a></li>
						<li><a onClick={nameMode}>Name</a></li>
						<li><a onClick={groupMode}>Group</a></li>
					</ul>
				</nav>
				

			</div>
		</div>
	);
}

export default OptionMenu;


=======
import './OptionMenu.css'
import Axios from "axios";
import { Link} from "react-router-dom";
function OptionMenu({userMode, nameMode, groupMode}) {
	const test = () => {	

			console.log("HHHHHH");

		
	}
	return(
		<div className="option-menu">
			<div className="container flex">

				<nav>
					<ul>
						<li><a onClick={nameMode}>User</a></li>
						<li><a onClick={nameMode}>Name</a></li>
						<li><a onClick={groupMode}>Group</a></li>
					</ul>
				</nav>
				

			</div>
		</div>
	);
}

export default OptionMenu;


>>>>>>> c7a0d0082295eda6cbd1598dae3bcb6a39101b14
