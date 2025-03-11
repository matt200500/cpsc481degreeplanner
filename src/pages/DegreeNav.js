import React, { useState } from 'react';
import '../styles/DegreeNav.css';

function DegreeNav() {
  const [faculty, setFaculty] = useState(""); 
  const [degree, setDegree] = useState(""); 
  const [error, setError] = useState(""); 

  const handleSearch = () => {
    if (!faculty || !degree) {
      setError("Must fill in all fields");
    } else {
      setError("");
      console.log("Searching for Faculty:", faculty, "Degree:", degree);
    }
  };

  const handleDegreeClick = (degreeName) => {
    console.log(`Viewing details for ${degreeName}`);
    
  };

  return (
    <div className="degree-nav">
      <h1>Welcome to the Degree Search</h1>
      <h2>To find a degree, select a faculty and degree program</h2>

      <div className='degree-search'>
        {/* Faculty dropdown */}
        <select value={faculty} onChange={(e) => setFaculty(e.target.value)}>
          <option value="" disabled hidden>Select Faculty...</option>
          <option value="ART">Art</option>
          <option value="BUSINESS">Business</option>
          <option value="ENG">Engineering</option>
          <option value="STEM">STEM</option>
        </select>

        {/* Degree Program dropdown */}
        <select value={degree} onChange={(e) => setDegree(e.target.value)}>
          <option value="" disabled hidden>Select Degree Program...</option>
          <option value="ART">Art</option>
          <option value="BIO">Biology</option>
          <option value="CHEM">Chemistry</option>
          <option value="CPSC">Computer Science</option>
          <option value="MATH">Math</option>
          <option value="PSYC">Psychology</option>
          <option value="PHYS">Physics</option>
        </select>

        {/* Search button */}
        <button onClick={handleSearch} disabled={!faculty || !degree}>
          Search
        </button>
      </div>
      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {/* List of degrees (nothing here yet just placeholder) */}
      <div className="degree-list">
        <ul>
          <li>
            Degree 1
            <button onClick={() => handleDegreeClick('Degree 1')}>View</button>
          </li>
          <li>
            Degree 2
            <button onClick={() => handleDegreeClick('Degree 2')}>View</button>
          </li>
          <li>
            Degree 3
            <button onClick={() => handleDegreeClick('Degree 3')}>View</button>
          </li>
          <li>
            Degree 4
            <button onClick={() => handleDegreeClick('Degree 4')}>View</button>
          </li>
          <li>
            Degree 5
            <button onClick={() => handleDegreeClick('Degree 5')}>View</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DegreeNav;
