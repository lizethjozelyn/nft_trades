import { useState } from 'react';

import '../components/FileUpload.css' 

function Community(props) {
  const [file, setFile] = useState('');
	const [setFilename] = useState('Choose File');

	const onChange = e => {
		setFile(e.target.files);
		setFilename(e.target.files.name);	
		
	};
  return (
    <div className='App'>
      <header className="App-header">
        Find a collector!
        </header>
      <div className="container">
				<section className="target">
					<p style={{opacity:0}} > s</p>
					<p>Drop your WebP, PNG or JPEG files here!</p>
					<p style={{opacity:0}} > s</p>
					<input type="file" onChange={onChange} />

				</section>

			</div>
      {file &&
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>

					<p>upload!</p>
          </div>
        </div>
      }
    </div>
  );
}

export default Community;
