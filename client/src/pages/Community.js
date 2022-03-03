import logo from './../logo.svg';

import Header from './../components/Header' 
import SearchBar from './../components/SearchBar' 
import users from './../components/MOCK_USER.json' 

function Community({}) {
  return (
    <div className="App">


	  <h1>Find a collector</h1>
	  <SearchBar placeholder="" data={users} />


    </div>
  );
}

export default Community;