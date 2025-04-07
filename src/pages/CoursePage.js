import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Hook to access URL params
import '../styles/CoursePage.css';

var courseData = require("../mockData/mock_courses.json");

function CoursePage() {
  const { courseName } = useParams(); // Extract courseName from the URL
  const program = courseName.split(/(\d+)/)[0].toUpperCase(); 
  const level = courseName.split(/(\d+)/)[1]; 

  const courseInfo = courseData.filter(
    (item) => item.program === program && item.course_number === level
  )[0];

  const [rating, setRating] = useState("");
  const [updatedCourseInfo, setUpdatedCourseInfo] = useState(courseInfo);
  const [hasRated, setHasRated] = useState(false);

  const handleRatingChange = (e) => {
    setRating(e.target.value); 
  };

  const handleRateCourse = () => {
    if (rating && !hasRated) { 
      const newTotalRatings = updatedCourseInfo.total_ratings + 1;
      const newAverageRating =
        (updatedCourseInfo.average_rating * updatedCourseInfo.total_ratings + parseInt(rating)) /
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

  return (
    <div className="CoursePage">
      <div className='CourseBox'>
        <h1>{courseName} details</h1>
        <h2>{updatedCourseInfo.info}</h2>
        <h3>
          <span className="label" title="Prerequisites are courses you must complete before taking this one.">Prerequisites: </span> 
          <span className="value">{updatedCourseInfo.prereq}</span>
        </h3>        
        <h3>
          <span className="label" title="Antirequisites are courses you cannot take if you have already taken this one.">Antirequisites: </span>
          <span className="value">{updatedCourseInfo.antireq}</span>
        </h3>
        <h3>
          <span className="label" title='Difficulty of courses are on a scale of 1 - 5, which dynamically changes from user ratings of a course'>Difficulty: </span>
          <span className="value">{updatedCourseInfo.difficulty}/5</span>
        </h3>
        <h3>
          <span className="label" title='This consists of the total ratings of this course by all students who rated it'>Total Ratings: </span>
          <span className="value">{updatedCourseInfo.total_ratings}</span>
        </h3>

        <div className="difficulty_selector">
          {/* Difficulty dropdown */}
          <select value={rating} onChange={handleRatingChange}>
            <option value="" disabled hidden>
              Rate course...
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {/* Rate Course button */}
          <button onClick={handleRateCourse} disabled={!rating || hasRated}>
            Rate Course
          </button>
        </div>
        <button id='return' onClick={() => window.history.back()} className="back-button"> Back to Search</button>
      </div>
    </div>
  );
} 

export default CoursePage;
