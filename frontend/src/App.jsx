import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from "./Components/Dashboard";
import Userprofile from "./Components/Userprofile"
// import Navbar from "./components/Navbar"

function App() {
  return (
    <Router>
      
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <div>
                <p>Chunga !!</p>
              </div>
            } 
          />

          {/* Route for Login */}
          <Route 
            path="/login" 
            element={
              <div>
                <Login />
              </div>
            } 
          />
          
          {/* Route for Signup */}
          <Route 
            path="/signup" 
            element={
              <div>
                <Signup />
              </div>
            } 
          />
          {/* <Navbar /> */}
          <Route path="/Userprofile" element={<Userprofile />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
