import React from 'react';
import { useParams } from 'react-router-dom'; // Hook to access URL params
import '../styles/CoursePage.css';

var courseData = require("../mockData/mock_courses.json")

function CoursePage() {
  const { courseName } = useParams(); // Extract courseName from the URL
  const program = courseName.split(/(\d+)/)[0].toUpperCase(); //get only program name
  const level= courseName.split(/(\d+)/)[1]; //get only course number

  //filter for corresponding course in json data (first array element after filter)
  const courseInfo = courseData.filter(item => item.program === program && item.course_number === level)[0]
  return (
    <div className='CoursePage'>
      <h1>{courseName} details</h1>
      <h2>Information</h2>
      <h2>{courseInfo.info}</h2>
      <h2>Prerequisistes: {courseInfo.prereq}</h2>
      <h2>Antirequisites: {courseInfo.antireq}</h2>
      <h2>Difficulty: * * *       Total ratings = 36</h2>
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
