import React from 'react';
import { useParams } from 'react-router-dom'; // Hook to access URL params
import '../styles/CoursePage.css';

function CoursePage() {
  const { courseName } = useParams(); // Extract courseName from the URL

  return (
    <div className='CoursePage'>
      <h1>{courseName} details</h1>
      <h2>Information_______________________________________________</h2>
      <h2>__________________________________________________________</h2>
      <h2>__________________________________________________________</h2>
      <h2>Prerequisistes: Math 231, Math 233</h2>
      <h2>Antirequisites: Math 201</h2>
      <h2>Difficulty: * * * </h2>
      <div className='difficulty_selecter'>
          {/* difficulty dropdown */}
          <select>
              <option value="" disabled hidden>Rate course...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
          </select>
          {/* Search button */}
          <button>
              Rate Course
          </button>
      </div>
    </div>
  );
}

export default CoursePage;
