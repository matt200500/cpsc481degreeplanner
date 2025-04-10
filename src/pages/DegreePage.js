import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/DegreePage.css';

import degreePlans from '../mockData/mock_recommend_plans.json';


/**
 * Convert "CPSC231" or "CPSC 231" to "CPSC 231"
 * @param {string} code
 * @returns {string}
 */
const codeToName = code => code.replace(/([A-Z]+)\s?(\d{3})/, '$1 $2');

/**
 * Return an array of { name, id, term } objects for the requested program.
 * Filters by year prefix if a year is selected (e.g., "Y1").
 *
 * @param {string} programKey - The program code, e.g. 'CPSC'
 * @param {string} selectedYear - Optional year filter, e.g. 'Y1'
 * @returns {{name: string, id: string, term: string}[]} Filtered list of courses
 */
function getCourses(programKey = 'CPSC', selectedYear = '') {
    const plan = degreePlans[programKey]?.plan ?? [];

    return plan
        .filter(item => /^[A-Z]{3,4}\s?\d{3}$/.test(item.code))
        .filter(item => {
            if (!selectedYear) return true;
            return item.term?.startsWith(selectedYear);
        })
        .map(item => ({
            name: codeToName(item.code),
            id: item.code.replace(' ', ''),
            term: item.term || ''
        }));
}



export default function DegreePage() {

    const { program } = useParams();
    const navigate     = useNavigate();

    /* -------- state -------- */
    const [selectedYear, setSelectedYear] = useState('');


    const courses = useMemo(
        () => getCourses(program || 'CPSC', selectedYear),
        [program, selectedYear]
    );
    const handleYearChange = (e) => setSelectedYear(e.target.value);


    const handleViewDetails = id => navigate(`/course/${id}`);

    const shouldShowNote = courses.length > 0 && (!selectedYear || courses.some(c => c.term.startsWith(selectedYear)));

    return (
        <div className="DegreePage">
            <h1>
                Bachelor of {program ? program.toUpperCase() : 'CPSC'}
            </h1>

            <h2 className="year-heading">
                Recommended Courses{' '}
                <select
                    className="year-dropdown"
                    value={selectedYear}
                    onChange={handleYearChange}
                >
                    <option value="">All Years</option>
                    <option value="Y1">Year 1</option>
                    <option value="Y2">Year 2</option>
                    <option value="Y3">Year 3</option>
                    <option value="Y4">Year 4</option>
                </select>
            </h2>



            {courses.length === 0 && !selectedYear ? (
                <p>No course plan found for this program.</p>
            ) : selectedYear && courses.filter(c => c.term.startsWith(selectedYear)).length === 0 ? (
                <p>No recommended courses for the selected year. Please plan accordingly.</p>
            ) : !selectedYear ? (
                <ul className="course-list">
                    {courses.map(c => (
                        <li className="course-item" key={c.id}>
                            <span className="course-name">{c.name}</span>
                            <button
                                className="view-button"
                                onClick={() => handleViewDetails(c.id)}
                            >
                                View Details
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <>
                    <h3>Fall Term</h3>
                    <ul className="course-list">
                        {courses.filter(c => c.term.endsWith('F')).map(c => (
                            <li className="course-item" key={c.id}>
                                <span className="course-name">{c.name}</span>
                                <button
                                    className="view-button"
                                    onClick={() => handleViewDetails(c.id)}
                                >
                                    View Details
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h3>Winter Term</h3>
                    <ul className="course-list">
                        {courses.filter(c => c.term.endsWith('W')).map(c => (
                            <li className="course-item" key={c.id}>
                                <span className="course-name">{c.name}</span>
                                <button
                                    className="view-button"
                                    onClick={() => handleViewDetails(c.id)}
                                >
                                    View Details
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {shouldShowNote && (
                <div className="course-note">
                    <ul>
                        <li>Each term is recommended to include approximately 5 courses.</li>
                        <li>The listed courses are all required; please fill in remaining courses as needed.</li>
                    </ul>
                </div>
            )}
        </div>
    );
}