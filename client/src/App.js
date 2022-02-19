import './App.css';
import Header from './components/Header'
import Home from './pages/Home' 
import Dashboard from './pages/Dashboard' 
import Community from './pages/Community' 
import Profile from './pages/Profile' 
import { BrowserRouter as Route, Routes} from "react-router-dom";
function App() {
  return (
    <div className="App">
		<Header />
		<Routes>
			
			<Route path='/' element={ <Home /> } />
			<Route path='/dashboard' element={ <Dashboard /> } />
			<Route path='/store' element={ <Dashboard /> } />
			<Route path='/community' element={ <Community /> } />
			<Route path='/profile*' element={ <Profile id={window.location.pathname} /> } />
		</Routes>

    </div>
  );
}

export default App;
