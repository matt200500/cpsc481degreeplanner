import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CourseNav.css';

// Auto-reset taken status on every page load
localStorage.removeItem("takenCourses");

const courseData = require("../mockData/mock_courses.json");

function CourseNav() {
  const [courseInput, setCourseInput] = useState("Default");
  const [levelInput, setLevelInput] = useState("");
  const [course, setCourse] = useState("");
  const [level, setLevel] = useState("");
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [takenFilter, setTakenFilter] = useState("");
  const [syncedCourses, setSyncedCourses] = useState(courseData);
  const [searchTakenFilter, setSearchTakenFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const takenCourses = JSON.parse(localStorage.getItem("takenCourses") || "{}");

    const updatedCourses = courseData.map((item) => {
      const key = `${item.program}${item.course_number}`;
      return {
        ...item,
        taken: takenCourses[key] ?? item.taken
      };
    });

    setSyncedCourses(updatedCourses);
  }, [searched]);

  const handleSearch = () => {
    if (!courseInput && !takenFilter) {
      setError("Please select a program or taken status");
    } else {
      setError("");
      setCourse(courseInput);
      setLevel(levelInput);
      setSearchTakenFilter(takenFilter); // <-- sync only on search
      setSearched(true);
    }
  };
  

  const filteredCourses = searched
  ? syncedCourses.filter(item => {
      const matchesProgram = course === "Default" || item.program === course;
      const matchesLevel = level === "" || item.course_number.startsWith(level);
      const matchesTaken =
        searchTakenFilter === ""
          || (searchTakenFilter === "taken" && item.taken === true)
          || (searchTakenFilter === "not_taken" && item.taken === false);
      return matchesProgram && matchesLevel && matchesTaken;
    })
  : syncedCourses;


  const handleCourseClick = (program, course_number) => {
    navigate(`/course/${program}${course_number}`);
  };

  return (
    <div className="course-nav">
      <h1>Welcome to the Courses Page</h1>
      <h2>To find a course, pick a program name and enter a course number</h2>

      <div className="course-search">
        <select value={courseInput} onChange={(e) => setCourseInput(e.target.value)}>
          <option value="Default">All Programs</option>
          <option value="ART">Art</option>
          <option value="BIO">Biology</option>
          <option value="CHEM">Chemistry</option>
          <option value="CPSC">Computer Science</option>
          <option value="MATH">Math</option>
          <option value="PSYC">Psychology</option>
          <option value="PHYS">Physics</option>
          <option value="PHIL">Philosophy</option>
        </select>

        <div className="dropdown">
          <input
            type="text"
            placeholder="Enter Course Number..."
            value={levelInput}
            onChange={(e) => setLevelInput(e.target.value)}
          />
          <div className="dropdown-select">
            {syncedCourses.filter(
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

        <select value={takenFilter} onChange={(e) => setTakenFilter(e.target.value)}>
          <option value="">All Courses</option>
          <option value="taken">Taken</option>
          <option value="not_taken">Not Taken</option>
        </select>

        <button onClick={handleSearch} disabled={!courseInput && !takenFilter}>
          Search
        </button>

        {error && <p style={{ color: "red", width: "100%" }}>{error}</p>}
      </div>

      <div className="course-list">
        {filteredCourses.length === 0 && searched ? (
          <p className="no-results">No matching courses found.</p>
        ) : (
          <ul>
            {filteredCourses.map((item, index) => (
              <li key={index}>
                <span>{item.program} {item.course_number}</span>
                <span className={`taken-status ${item.taken ? "taken" : "not-taken"}`}>
                  {item.taken ? "TAKEN" : "NOT TAKEN"}
                </span>
                <button onClick={() => handleCourseClick(item.program, item.course_number)}>
                  View Details
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CourseNav;
