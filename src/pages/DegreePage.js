import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Access URL params and navigation
import '../styles/DegreePage.css';

function DegreePage() {
    const { degree } = useParams();
    const navigate = useNavigate();

    // Example course data for Semester 1 (you can update these with real courses)
    const courses = [
        { name: 'CPSC 201', id: 'CPSC201' },
        { name: 'MATH 249', id: 'MATH249' },
        { name: 'MATH 251', id: 'MATH251' },
        { name: 'CPSC 211', id: 'CPSC211' }
    ];

    const handleViewDetails = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    return (
        <div className='DegreePage'>
            <h1>{degree ? `Bachelors in ${degree.replace('%20', ' ')}` : 'Bachelors in Computer Science'}</h1>
            <h2>Semester 1</h2>

            <ul className="course-list">
                {courses.map((course, index) => (
                    <li className="course-item" key={index}>
                        <span className="course-name">{course.name}</span>
                        <button
                            className="view-button"
                            onClick={() => handleViewDetails(course.id)}
                        >
                            View Details
                        </button>
                    </li>
                ))}
            </ul>

            <h2>Difficulty: ★ ★ ★</h2>
        </div>
    );
}

export default DegreePage;