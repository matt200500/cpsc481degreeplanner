import React, { useState } from 'react';
import '../styles/CourseNav.css';

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
        <input 
          type="text" 
          placeholder="Enter Course Number..." 
          value={level} 
          onChange={(e) => setLevel(e.target.value)} 
        />

        {/* button to search */}
        <button onClick={handleSearch} disabled={!course || !level}>
          Search
        </button>

        {/* error message to console if search fails */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        
      </div>

      {/* list of courses (contains nothing rn) */}
      <div className="course-list">
        <ul>
          <li>
            Course 1
            <button onClick={() => handleCourseClick('Course 1')}>View</button>
          </li>
          <li>
            Course 2
            <button onClick={() => handleCourseClick('Course 2')}>View</button>
          </li>
          <li>
            Course 3
            <button onClick={() => handleCourseClick('Course 3')}>View</button>
          </li>
          <li>
            Course 4
            <button onClick={() => handleCourseClick('Course 4')}>View</button>
          </li>
          <li>
            Course 5
            <button onClick={() => handleCourseClick('Course 5')}>View</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CourseNav;
