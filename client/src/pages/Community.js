import logo from './../logo.svg';

import Header from './../components/Header' 
import OptionMenu from './../components/OptionMenu' 
import SearchBar from './../components/SearchBar' 
import users from './../components/MOCK_USER.json' 
import { Fragment, useState } from 'react';

function Community({}) {
	const [searchMode, setSearchMode] = useState('user');
	const [searchMsg, setSearchMsg] = useState('Find a collector');

	const userMode = () => {
		setSearchMode("user");
		setSearchMsg("Find a collector");
		//console.log("S");
	}

	const nameMode = () => {
		setSearchMode("name");
		setSearchMsg("Find an image");
		//console.log("S");
	}

	const groupMode = () => {
		setSearchMode("group");
		setSearchMsg("Find a group");
		//console.log("S");
	}

  return (
	<>
    <div className="community" >


	  <h1>{searchMsg}</h1>
		<div className="option-menu">
			<div className="container flex">


				<nav>
					<ul>
						<li><a onClick={userMode}>User</a></li>
						<li><a onClick={nameMode}>Name</a></li>
						<li><a onClick={groupMode}>Group</a></li>
					</ul>
				</nav>
				

			</div>
		</div>
	  <SearchBar placeholder="" data={searchMode}/>


    </div>

	</>
  );
}

export default Community;