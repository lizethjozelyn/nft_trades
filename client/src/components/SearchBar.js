import logo from './../logo.svg';
import { Link} from "react-router-dom";
import { Fragment, useState } from 'react';
import Axios from "axios";

import Header from './../components/Header' 

function SearchBar({placeholder, data}) {

	//const [username, setUsername] = useState('');	
	const [userList, setUserList] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [searchState, setSearchState] = useState('');
	console.log(userList.length);
	const sendQuery = e => {
		const username=e.target.value;
		//let url = "http://localhost:3305/search/q=" + e.target.value;
		console.log(userList.length);
		if (userList.length==0) {
			Axios.get("http://localhost:3305/search").then((response) => {
				//console.log(response);
				setUserList(response.data);
				//setFilteredData([]);
				setSearchState("");		
			});	
		} else if (username.length>0) {
				setSearchState("No Users Found");		
			
			const searchWord = username;
			const newFilter = userList.filter((value) => {
				return value.user_id.includes(searchWord);
			})
			
			setFilteredData(newFilter);
		} else {
				setFilteredData([]);
			
		}
		console.log("S");
		//console.log(url);
	};

	
//prob slice data in serv	
  return (

	<div className="searchbar">
		<div className="searchInputs">
			<input type="text" onChange={sendQuery} />
		</div>
		{filteredData.length > 0 && userList ? (
			<div className="searchResults">
				{filteredData.slice(0, 10).map((value, i) => {
					return (
						<div key={i}>
							<Link to={value.user_id} key={i}>
								{value.user_id}{" "}
							</Link>{" "}
						</div>
					);
				})}
			</div>
		) : (
			<p> {searchState} </p>
		)}
	</div>

  );
}

export default SearchBar;