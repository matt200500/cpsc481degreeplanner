import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DegreeNav.css';

const degreeData = require("../mockData/mock_degrees.json"); // Ensure correct data file

function DegreeNav() {
  const [facultyInput, setFacultyInput] = useState("");
  const [degreeInput, setDegreeInput] = useState("");  // Degree is optional now
  const [faculty, setFaculty] = useState(""); 
  const [degree, setDegree] = useState(""); 
  const [error, setError] = useState(""); 
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!facultyInput) {  // Only check for faculty input
      setError("Faculty must be selected.");
    } else {
      setError("");
      setFaculty(facultyInput);  // Set the faculty
      setDegree(degreeInput);    // Degree is optional
      setSearched(true);         // Enable searching
    }
  };

  // Filtering logic: if degreeInput is empty, filter by faculty only
  const filteredDegrees = searched
    ? degreeData.filter(item => {
        const matchesFaculty = faculty === "Default" || item.faculty === faculty;
        const matchesDegree = degree === "Default" || item.degree === degree;
        return matchesFaculty && (degree === "" || matchesDegree);
      })
    : degreeData;

  // Navigate to the degree page
  const handleDegreeClick = (facultyName, degreeName) => {
    navigate(`/degree/${facultyName}${degreeName}`);
  };

  return (
    <div className="degree-nav">
      <h1>Welcome to the Degree Search</h1>
      <h2>To find a degree, select a faculty and optionally a degree program</h2>

      <div className='degree-search'>
        {/* Faculty dropdown */}
        <select value={facultyInput} onChange={(e) => setFacultyInput(e.target.value)}>
          <option value="" disabled hidden>Select Faculty...</option>
          <option value="Default">All Faculties</option>
          <option value="ART">Art</option>
          <option value="BUSINESS">Business</option>
          <option value="STEM">STEM</option>
        </select>

        {/* Degree Program dropdown */}
        <select value={degreeInput} onChange={(e) => setDegreeInput(e.target.value)}>
          <option value="" disabled hidden>Select Degree Program...</option>
          <option value="Default">All Programs</option>
          <option value="ART">Art</option>
          <option value="BIO">Biology</option>
          <option value="CHEM">Chemistry</option>
          <option value="CPSC">Computer Science</option>
          <option value="ENG">Engineering</option>
          <option value="HIST">History</option>
          <option value="MATH">Math</option>
          <option value="PSYC">Psychology</option>
          <option value="PHYS">Physics</option>
        </select>

        {/* Search button */}
        <button onClick={handleSearch} disabled={!facultyInput}>
          Search
        </button>
      </div>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* List of filtered degrees */}
      <div className="degree-list">
        <ul>
          {filteredDegrees.map((item, index) => (
            <li key={index}>
              {item.faculty} {item.degree}
              <button onClick={() => handleDegreeClick(item.faculty, item.degree)}>
                View Details
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DegreeNav;
