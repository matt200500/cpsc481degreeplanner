import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DegreeNav.css';

const degreeData = require("../mockData/mock_degrees.json"); // Ensure correct data file

function DegreeNav() {
  const [facultyInput, setFacultyInput] = useState("Default");
  const [degreeInput, setDegreeInput] = useState("Default"); 
  const [faculty, setFaculty] = useState(""); 
  const [degree, setDegree] = useState(""); 
  const [error, setError] = useState(""); 
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!facultyInput) { 
      setError("Faculty must be selected.");
    } else {
      setError("");
      setFaculty(facultyInput);  
      setDegree(degreeInput);    
      setSearched(true);         
    }
  };

  const filteredDegrees = searched
    ? degreeData.filter(item => {
        const matchesFaculty = faculty === "Default" || item.faculty === faculty;
        const matchesDegree = degree === "Default" || item.degree === degree;
        return matchesFaculty && (degree === "" || matchesDegree);
      })
    : degreeData;

  const handleDegreeClick = (programCode) => {
    navigate(`/degree/${programCode}`);
  };

  return (
    <div className="degree-nav">
      <h1>Welcome to the Degree Search</h1>
      <h2>To find a degree, select a faculty and optionally a degree program</h2>

      <div className='degree-search'>
        {/* Faculty dropdown */}
        <select value={facultyInput} onChange={(e) => setFacultyInput(e.target.value)}>
          <option value="Default">All Faculties</option>
          <option value="ART">Art</option>
          <option value="BUSINESS">Business</option>
          <option value="STEM">STEM</option>
        </select>

        {/* Degree Program dropdown */}
        <select value={degreeInput} onChange={(e) => setDegreeInput(e.target.value)}>
          <option value="Default">All Programs</option>
          <option value="Arts">Art</option>
          <option value="Art History">Art History</option>
          <option value="Biology">Biology</option>
          <option value="Business Administration">Business Administration</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Finance">Finance</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="HIST">History</option>
          <option value="Mathematics">Math</option>
          <option value="Marketing">Marketing</option>
          <option value="PSYC">Psychology</option>
          <option value="Physics">Physics</option>
        </select>

        {/* Search button */}
        <button onClick={handleSearch} disabled={!facultyInput && !degreeInput}>
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
              <button onClick={() => handleDegreeClick(item.programCode)}>
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
