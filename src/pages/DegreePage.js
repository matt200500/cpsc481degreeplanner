import React from 'react';
import { useParams } from 'react-router-dom'; // Hook to access URL params
import '../styles/DegreePage.css';

function DegreePage() {
  const { degree } = useParams();

  return (
    <div className='DegreePage'>
      <h1>Bachelors in Computer Science</h1>
      <h2>Semester 1</h2>
      <p>Course 1</p>
      <p>Course 2</p>
      <p>Course 3</p>
      <p>Course 4</p>
      <p>Course 5</p>
      <p></p>

      <h2>Difficulty: * * * </h2>
    </div>
  );
}

export default DegreePage;
