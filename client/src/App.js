import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Home from './pages/Home' 
import Dashboard from './pages/Dashboard' 
import Community from './pages/Community' 
import Profile from './pages/Profile' 
import Upload from './components/FileUpload' 
import LoginReg from './components/LoginReg' 
import { Route, Routes} from "react-router-dom";
function App() {
  return (
    <div className="App">
		<Header />
		<Routes>
			
			<Route path='/' element={ <Home /> } />
			<Route path='/dashboard' element={ <Dashboard /> } />
			<Route path='/store' element={ <Upload /> } />
			<Route exact path='/community' element={ <Community /> } />
			<Route exact path='/community/*' element={ <Dashboard /> } />
			<Route path='/login' element={ <LoginReg /> } />
			
		</Routes>

    </div>
  );
}

export default App;
