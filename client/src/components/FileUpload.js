import { Fragment, useState } from 'react';
import logo from './../logo.svg';

import './FileUpload.css'
import { Link } from "react-router-dom";
import Axios from "axios";
function FileUpload() {
	const [url, setUrl] = useState('');

	const onChange = e => {
		setUrl(e.target.value);	
	};

	function uploadImg(url){
		Axios.post("http://localhost:3305/search/upload", {
			url: url,
		})
		alert("Image Uploaded! Thank you <3")
	}

	return(
		<div className='input'>
		<form action="/" method="get">
			<input
				value = {url}
				type="text"
				id="header-search"
				placeholder="Upload Image URL Here!"
				onChange={onChange}
			/>
			<button type="upload" onClick={function(){uploadImg(url)}}>Upload</button>
		</form>
		</div>
	)
	}	export default FileUpload;
