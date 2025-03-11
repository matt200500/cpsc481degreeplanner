import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Import your custom pages
import DegreeNav from './pages/DegreeNav';
import CourseNav from './pages/CourseNav';
import CoursePage from './pages/CoursePage';  
import DegreePage from './pages/DegreePage';
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
              <li><a href="/">Home</a></li>
              <li><a href="/Degrees">Degree Search</a></li>
              <li><a href="/Courses">Course Search</a></li>
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
        </Routes>
        
        {/* Footer Component */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
