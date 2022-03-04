import logo from './../logo.svg';

import Header from './../components/Header' 
import OptionMenu from './../components/OptionMenu' 
import SearchBar from './../components/SearchBar' 
import users from './../components/MOCK_USER.json' 
import { Fragment, useState } from 'react';

function Community({}) {
	const [searchMode, setSearchMode] = useState('user');

	const userMode = () => {
		setSearchMode("user");
		//console.log("S");
	}

	const nameMode = () => {
		setSearchMode("name");
		console.log("S");
	}

	const groupMode = () => {
		setSearchMode("group");
		//console.log("S");
	}

  return (

    <div className="community">


	  <h1>Find a collector {searchMode}</h1>
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
	  <SearchBar placeholder="" data={searchMode} />


    </div>
  );
}

export default Community;