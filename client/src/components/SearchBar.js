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

	const [filteredData, setFilteredData] = useState([]);
	const [filteredDataN, setFilteredDataN] = useState([]);
	const [filteredDataG, setFilteredDataG] = useState([]);
	const [searchState, setSearchState] = useState('');
	
	
	/*******
		TODO:
			condense code
			figure out way to reset board on mode change
			write api calls
	
	******/
	

	
	// console.log(userList.length);
	const sendQuery = e => {
		// console.log(data);

		const apiCall = "http://localhost:3305/search/" + data;
		const searchQuery=e.target.value;
		//let url = "http://localhost:3305/search/q=" + e.target.value;
		// console.log(userList.length);
		
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
					//const msg = "No " + data + " Found";
					const msg = "Not Found"					
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
					//const msg = "No " + data + " Found";
					const msg = "Not Found"					
					//msg doesn't update immediately on mode change, so wipe search query on mode change
					//or have community.js handle this
					setSearchState(msg);		
				
				const searchWord = searchQuery;
				const newFilter = nameList.filter((value) => {
					
					//CHANGE THIS TO BE APPROPRIATE WITH WHAT DATA YOU NEED TO GRAB ****************************************************************
					if (value.image_name!=null) {
					// console.log(value.image_name);
					return value.image_name.includes(searchWord);
				}
				})
				
				setFilteredDataN(newFilter);
			} else {
					setFilteredDataN([]);
				
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
					//const msg = "No " + data + " Found";
					const msg = "Not Found"
					//msg doesn't update immediately on mode change, so wipe search query on mode change
					//or have community.js handle this
					setSearchState(msg);		
				
				const searchWord = searchQuery;
				const newFilter = groupList.filter((value) => {
					return value.image_group.includes(searchWord);
				})
				
				setFilteredDataG(newFilter);
			} else {
					setFilteredDataG([]);
				
			}
		
		}
		// console.log("S");
		//console.log(url);
	};

	const getUrl = (a, b) => {
		return(a+b);
	}

	
//prob slice data in serv	
	if (data=='user') {	
	
	  return (

		<div className="searchbar">
			<div className="searchInputs">
				<input type="text" aria-label="Search by username" placeholder="Search by username" className="inputBox" onChange={sendQuery} />
			</div>
			{filteredData.length > 0 && userList ? (
				<div className="searchResults">
					{filteredData.slice(0, 10).map((value, i) => {
						return (
							<div key={i} className="user-result">
								<Link to={getUrl("u/", value.user_id)} key={i}>
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
	} else if (data=='name') {
		return(
		<div className="searchbar">
			<div className="searchInputs">
				<input type="text" aria-label="Search by image" placeholder="Search by image" className="inputBox" onChange={sendQuery} />
			</div>
			{filteredDataN.length > 0 && nameList ? (
				<div className="searchResults">
					{filteredDataN.slice(0, 10).map((value, i) => {
						return (
							<div key={i} className="user-result">
								<Link to={getUrl("n/", value.image_name)} key={i}>
									{value.image_name}{" "}
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
	} else {
		return(
		<div className="searchbar">
			<div className="searchInputs">
				<input type="text" aria-label="Search by group" placeholder="Search by group" className="inputBox" onChange={sendQuery} />
			</div>
			{filteredDataG.length > 0 && nameList ? (
				<div className="searchResults">
					{filteredDataG.slice(0, 10).map((value, i) => {
						return (
							<div key={i} className="user-result">
								<Link to={getUrl("g/", value.image_group)} key={i}>
									{value.image_group}{" "}
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
}
//CHANGE image_name for group
export default SearchBar;