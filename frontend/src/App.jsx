import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Signup from './components/signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
