import logo from './../logo.svg';
import { Link} from "react-router-dom";
import { Fragment, useState } from 'react';
import './SearchBar.css'
import Axios from "axios";

import Header from './../components/Header' 

function SearchBar({placeholder, data}) {

	//const [username, setUsername] = useState('');	
	const [userList, setUserList] = useState([]);
	const [nameList, setNameList] = useState([]);
	const [groupList, setGroupList] = useState([]);
	const [responseList, setResponseList] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [searchState, setSearchState] = useState('');
	
	
	/*******
		TODO:
			condense code
			figure out way to reset board on mode change
			write api calls
	
	******/
	
	
	
	const setActiveData = () => {
		console.log(data);
		
		
		
		
	}
	
	console.log(userList.length);
	const sendQuery = e => {
		console.log(data);
		setActiveData();
		const apiCall = "http://localhost:3305/search/" + data;
		const searchQuery=e.target.value;
		//let url = "http://localhost:3305/search/q=" + e.target.value;
		console.log(userList.length);
		
		//will be condensed later
		if (data=='user') {			
			if (userList.length==0) {
				Axios.get(apiCall).then((response) => {
					//console.log(response);
					setUserList(response.data);
					//setFilteredData([]);
					setSearchState("");		
				});	
			} else if (searchQuery.length>0) {
					const msg = "No " + data + " Found";
					//msg doesn't update immediately on mode change, so wipe search query on mode change
					//or have community.js handle this
					setSearchState(msg);		
				
				const searchWord = searchQuery;
				const newFilter = userList.filter((value) => {
					return value.user_id.includes(searchWord);
				})
				
				setFilteredData(newFilter);
			} else {
					setFilteredData([]);
				
			}
		
		} else if (data=='name') {	
			if (nameList.length==0) {
				Axios.get(apiCall).then((response) => {
					//console.log(response);
					setNameList(response.data);
					//setFilteredData([]);
					setSearchState("");		
				});	
			} else if (searchQuery.length>0) {
					const msg = "No " + data + " Found";
					//msg doesn't update immediately on mode change, so wipe search query on mode change
					//or have community.js handle this
					setSearchState(msg);		
				
				const searchWord = searchQuery;
				const newFilter = nameList.filter((value) => {
					
					//CHANGE THIS TO BE APPROPRIATE WITH WHAT DATA YOU NEED TO GRAB ****************************************************************
					return value.user_id.includes(searchWord);
				})
				
				setFilteredData(newFilter);
			} else {
					setFilteredData([]);
				
			}
		} else {			
			if (groupList.length==0) {
				console.log(apiCall);
				console.log("GROUP CALL");
				Axios.get(apiCall).then((response) => {
					//console.log(response);
					setGroupList(response.data);
					//setFilteredData([]);
					setSearchState("");		
				});	
			} else if (searchQuery.length>0) {
					const msg = "No " + data + " Found";
					//msg doesn't update immediately on mode change, so wipe search query on mode change
					//or have community.js handle this
					setSearchState(msg);		
				
				const searchWord = searchQuery;
				const newFilter = groupList.filter((value) => {
					return value.user_id.includes(searchWord);
				})
				
				setFilteredData(newFilter);
			} else {
					setFilteredData([]);
				
			}
		
		}
		console.log("S");
		//console.log(url);
	};

	
//prob slice data in serv	
  return (

	<div className="searchbar">
		<div className="searchInputs">
			<input type="text" aria-label="Search by -- username" placeholder="Search by -- username" className="inputBox" onChange={sendQuery} />
		</div>
		{filteredData.length > 0 && userList ? (
			<div className="searchResults">
				{filteredData.slice(0, 10).map((value, i) => {
					return (
						<div key={i} className="user-result">
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