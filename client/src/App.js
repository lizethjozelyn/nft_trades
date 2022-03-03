import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Home from './pages/Home'
import Store from './pages/Store'
import Community from './pages/Community' 
import Profile from './pages/Profile'
import LoginReg from './components/LoginReg' 
import { Route, Routes} from "react-router-dom";
import { SliderData } from './components/SliderData';
function App() {
  return (
    <div className="App">
		<Header />
		<Routes>
			
			<Route path='/' element={ <Home /> }/>
			<Route path='/profile' element={ <Profile /> }/>
			<Route path='/store' element={ <Store /> } />
			<Route exact path='/community' element={ <Community /> } />
			<Route path='/login' element={ <LoginReg /> } />
			
		</Routes>
    </div>
  );
}

export default App;
