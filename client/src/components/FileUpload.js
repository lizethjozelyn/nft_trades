import { Fragment, useState } from 'react';
import logo from './../logo.svg';

import './FileUpload.css'
import { Link } from "react-router-dom";
function FileUpload() {

	const [file, setFile] = useState('');
	const [filename, setFilename] = useState('Choose File');
	const [isFilePicked, setIsFilePicked] = useState(false);

	const onChange = e => {
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);

	};

	const onSubmit = e => {


		e.preventDefault();
		console.log(file);
		/*Even this simple block of code wouldn't work without e.preventDefault();
		*/

	}






	return (
		<div className="custom-file">
			<div className="container">
				<section className="target">
					<p style={{ opacity: 0 }} > s</p>
					<p>Drop your WebP, PNG or JPEG files here!</p>
					<p style={{ opacity: 0 }} > s</p>
					<input type="file" accept="image/*" onChange={onChange} />
				</section>

			</div>
			<button onClick={onSubmit}>Generate!

				{file &&
					<div className='row mt-5'>
						<div className='col-md-6 m-auto'>

							<p>upload!</p>
						</div>
					</div>
				}
			</button>

		</div>
	);
}
/*
Add props that allow for resizing for dashboard
<img src={logo} className="App-logo" alt="logo" Style="width:10%" />*/


export default FileUpload;


