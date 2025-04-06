import React, { useState } from 'react';
import '../styles/CourseNav.css';

var courseData = require("../mockData/mock_courses.json")

function CourseNav() {
  const [course, setCourse] = useState("");
  const [level, setLevel] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!course || !level) {
      setError("Must fill in fields");
    } else {
      setError("");
      console.log("Searching for:", course, level);
    }
  };

  const handleCourseClick = (courseName) => {
    console.log(`Viewing details for ${courseName}`);
    // Add further functionality as needed, such as navigating to a detailed view page
  };

  return (
    <div className="course-nav">
      <h1>Welcome to the Courses Page</h1>
      <h2>To find a course, pick a program name and enter a course number</h2>

      <div className="course-search">
        {/* course degree dropdown*/}
        <select value={course} onChange={(e) => setCourse(e.target.value)}>
          <option value="" disabled hidden>Select Course Program...</option>
          <option value="ART">Art</option>
          <option value="BIO">Biology</option>
          <option value="CHEM">Chemistry</option>
          <option value="CPSC">Computer Science</option>
          <option value="MATH">Math</option>
          <option value="PSYC">Psychology</option>
          <option value="PHYS">Physics</option>
        </select>

        {/* couse number field*/}
        <div className="dropdown">
            <input 
              type="text" 
              placeholder="Enter Course Number..." 
              value={level} 
              onChange={(e) => setLevel(e.target.value)} />
            <div className="dropdown-select">
              {courseData.filter(
                // filter for courses within the selected program and matching typed numbers
                item => course && level && course === item.program && item.course_number.startsWith(level) && item.course_number !== level
              )
              .map((item) => (
                <div onClick={() => setLevel(item.course_number)}className="dropdown-row"> {item.course_number} </div>
              ))}
            </div>
        </div>
        {/* button to search */}
        <button onClick={handleSearch} disabled={!course || !level}>
          Search
        </button>

        {/* error message to console if search fails */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        
      </div>
      
      {/*list of courses*/}
      { course || level ? (
        <div className="course-list">
          <ul>
            {courseData.filter(
              item => item.program === course && item.course_number.startsWith(level)
            )
            .map((item) => (
                  <li> {item.program} {item.course_number} 
                    <button onClick={() => handleCourseClick('Course 1')}>View</button>
                  </li>
                ))}
          </ul>
        </div>
        ) : <h3>Select a course</h3>  }
           
    </div>
  );
}

export default CourseNav;