import logo from './../logo.svg';
import Header from './../components/Header' 
import FileUpload from '../components/FileUpload'

function Community(props) {
  return (
    <div className="App">
      <header className="App-header">
	  <h1>Find a collector</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
		{window.location.pathname}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        Upload potential NFTs here
        </a>
      </header>
    </div>
  );
}

export default Community;
