import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/CoursePage.css';

const courseData = require("../mockData/mock_courses.json");

function CoursePage() {
  const { courseName } = useParams();
  const program = courseName.split(/(\d+)/)[0].toUpperCase(); 
  const level = courseName.split(/(\d+)/)[1];
  const courseKey = `${program}${level}`;

  const initialCourseInfo = courseData.find(
    (item) => item.program === program && item.course_number === level
  );

  const [rating, setRating] = useState("");
  const [updatedCourseInfo, setUpdatedCourseInfo] = useState(initialCourseInfo);
  const [hasRated, setHasRated] = useState(false);
  const [isTaken, setIsTaken] = useState(
    JSON.parse(localStorage.getItem("takenCourses") || "{}")[courseKey] || false
  );

  const handleRatingChange = (e) => {
    setRating(e.target.value); 
  };

  const handleRateCourse = () => {
    if (rating && !hasRated) { 
      const newTotalRatings = updatedCourseInfo.total_ratings + 1;
      const newAverageRating =
        ((updatedCourseInfo.average_rating || updatedCourseInfo.difficulty) * updatedCourseInfo.total_ratings + parseInt(rating)) /
        newTotalRatings;

      const updatedCourse = {
        ...updatedCourseInfo,
        total_ratings: newTotalRatings,
        average_rating: newAverageRating,
      };

      setUpdatedCourseInfo(updatedCourse);
      setHasRated(true);
      alert("Course rated successfully!");
    } else {
      alert("You have already rated this course!");
    }
  };

  const handleCheckboxChange = () => {
    if (!isTaken) {
      const confirm = window.confirm("Are you sure you want to mark this course as taken?");
      if (!confirm) return;
    }

    const updatedTaken = !isTaken;
    setIsTaken(updatedTaken);
    const takenCourses = JSON.parse(localStorage.getItem("takenCourses") || "{}");
    takenCourses[courseKey] = updatedTaken;
    localStorage.setItem("takenCourses", JSON.stringify(takenCourses));
  };

  return (
    <div className="CoursePage">
      <div className='CourseBox'>
        <h1>{courseKey} details</h1>
        <h2>{updatedCourseInfo.info}</h2>

        <h3><span className="label">Prerequisites: </span> <span className="value">{updatedCourseInfo.prereq}</span></h3>        
        <h3><span className="label">Antirequisites: </span> <span className="value">{updatedCourseInfo.antireq}</span></h3>
        <h3><span className="label">Difficulty: </span> <span className="value">{updatedCourseInfo.difficulty}/5</span></h3>
        <h3><span className="label">Total Ratings: </span> <span className="value">{updatedCourseInfo.total_ratings}</span></h3>

        <div className="difficulty_selector">
          <select value={rating} onChange={handleRatingChange}>
            <option value="" disabled hidden>Rate course...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button onClick={handleRateCourse} disabled={!rating || hasRated}>
            Rate Course
          </button>
        </div>

        <div className="taken-checkbox">
          <input
            type="checkbox"
            checked={isTaken}
            disabled={isTaken}
            onChange={handleCheckboxChange}
            id="taken-toggle"
          />
          <label htmlFor="taken-toggle">
            {isTaken ? "Taken (already marked)" : "Mark as Taken"}
          </label>
        </div>

        <button id='return' onClick={() => window.history.back()} className="back-button">
          Back to Search
        </button>
      </div>
    </div>
  );
}

export default CoursePage;
