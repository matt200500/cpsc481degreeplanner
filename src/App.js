import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Import your custom pages
import DegreeNav from './pages/DegreeNav';
import CourseNav from './pages/CourseNav';
import CoursePage from './pages/CoursePage';  
import DegreePage from './pages/DegreePage';
import LoginPage from './pages/LoginPage'; // Import the LoginPage component
import SignupPage from './pages/SignupPage'; // Import the LoginPage component
import Footer from './pages/Footer'; // Import the Footer component
import './styles/App.css';

function App() {
  return (
    <Router>
      <div>
        <div className="Navigation">
          {/* Navigation Links */}
          <nav>
            <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Degrees">Degree Search</Link></li>
            <li><Link to="/Courses">Course Search</Link></li>
            <li><Link to="/Login">Login</Link></li>
            <li><Link to="/Signup">Signup</Link></li>
            </ul>
          </nav>
        </div>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Degrees" element={<DegreeNav />} />
          <Route path="/Courses" element={<CourseNav />} />
          <Route path="/course/:courseName" element={<CoursePage />} />
          <Route path="/degree/:degreeName" element={<DegreePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Signup" element={<SignupPage />} />
        </Routes>
        
        {/* Footer Component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
