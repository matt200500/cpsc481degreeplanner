import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CourseNav.css';

const courseData = require("../mockData/mock_courses.json");

function CourseNav() {
  const [courseInput, setCourseInput] = useState("");
  const [levelInput, setLevelInput] = useState("");
  const [course, setCourse] = useState("");
  const [level, setLevel] = useState("");
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!courseInput) {
      setError("Must select a course program");
    } else {
      setError("");
      setCourse(courseInput);
      setLevel(levelInput);
      setSearched(true);
    }
  };
  
  const filteredCourses = searched
    ? courseData.filter(item => {
        const matchesProgram = course === "Default" || item.program === course;
        const matchesLevel = level === "" || item.course_number.startsWith(level);
        return matchesProgram && matchesLevel;
      })
    : courseData;


    const navigate = useNavigate();
    const handleCourseClick = (program, course_number) => {
      navigate(`/course/${program}${course_number}`);
    };


  return (
    <div className="course-nav">
      <h1>Welcome to the Courses Page</h1>
      <h2>To find a course, pick a program name and enter a course number</h2>

      <div className="course-search">
        {/* Course Program Dropdown */}
        <select value={courseInput} onChange={(e) => setCourseInput(e.target.value)}>
          <option value="" disabled hidden>Select Course Program...</option>
          <option value="Default">All Programs</option>
          <option value="ART">Art</option>
          <option value="BIO">Biology</option>
          <option value="CHEM">Chemistry</option>
          <option value="CPSC">Computer Science</option>
          <option value="MATH">Math</option>
          <option value="PSYC">Psychology</option>
          <option value="PHYS">Physics</option>
        </select>

        {/* Course Number Input */}
        <div className="dropdown">
          <input
            type="text"
            placeholder="Enter Course Number..."
            value={levelInput}
            onChange={(e) => setLevelInput(e.target.value)}
          />
          <div className="dropdown-select">
            {courseData.filter(
              item =>
                courseInput &&
                levelInput &&
                item.program === courseInput &&
                item.course_number.startsWith(levelInput) &&
                item.course_number !== levelInput
            ).map((item) => (
              <div
                key={item.course_number}
                onClick={() => setLevelInput(item.course_number)}
                className="dropdown-row"
              >
                {item.course_number}
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSearch} disabled={!courseInput}>
          Search
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <div className="course-list">
        <ul>
          {filteredCourses.map((item, index) => (
            <li key={index}>
              {item.program} {item.course_number}
              <button onClick={() => handleCourseClick(item.program, item.course_number)}>
                View Details
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CourseNav;
