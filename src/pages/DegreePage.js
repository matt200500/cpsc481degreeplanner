// ------------------------------------------------------------
// DegreePage.js
// Shows the recommended course list for a given degree program.
// Program key is read from the URL:  /degree/:program
// Data source:  src/mockData/mock_recommend_plans.json
// ------------------------------------------------------------

import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/DegreePage.css';

// JSON file that contains the full recommended‑plan data.
//   {
//     "CPSC": { "plan": [ { "code": "CPSC 231", ... }, ... ] },
//     "MATH": { "plan": [ ... ] },
//     ...
//   }
import degreePlans from '../mockData/mock_recommend_plans.json';

/* ------------------------------------------------------------------
   Helper functions
------------------------------------------------------------------- */

/**
 * Convert "CPSC231" or "CPSC 231" to "CPSC 231"
 * @param {string} code
 * @returns {string}
 */
const codeToName = code => code.replace(/([A-Z]+)\s?(\d{3})/, '$1 $2');

/**
 * * Return an array of { name, id, term } objects for the requested program.
 *  * Filters by year prefix if a year is selected (e.g., "Y1").
 * @param {string} programKey
 * * @param {string} selectedYear
 * * @returns {{name:string,id:string,term:string}[]}
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

/* ------------------------------------------------------------------
   Component
------------------------------------------------------------------- */

export default function DegreePage() {
    /* -------- routing -------- */
    // URL pattern is  /degree/:program
    const { program } = useParams();
    const navigate     = useNavigate();

    /* -------- state -------- */
    const [selectedYear, setSelectedYear] = useState('');

    /* -------- memoised data -------- */
    // Re‑compute the list only when the program key or selected year changes.
    const courses = useMemo(
        () => getCourses(program || 'CPSC', selectedYear),
        [program, selectedYear]
    );
    const handleYearChange = (e) => setSelectedYear(e.target.value);

    /* -------- handlers -------- */
    const handleViewDetails = id => navigate(`/course/${id}`);

    /* -------- render -------- */
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

            {!selectedYear ? (
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
        </div>
    );
}