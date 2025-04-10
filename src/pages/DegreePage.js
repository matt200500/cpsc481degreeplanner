// ------------------------------------------------------------
// DegreePage.js
// Shows the recommended course list for a given degree program.
// Program key is read from the URL:  /degree/:program
// Data source:  src/mockData/mock_recommend_plans.json
// ------------------------------------------------------------

import React, { useMemo } from 'react';
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
 * Return an array of { name, id } objects for the requested program.
 * If the program key is missing, fall back to "CPSC".
 * @param {string} programKey
 * @returns {{name:string,id:string}[]}
 */
function getCourses(programKey = 'CPSC') {
    const plan = degreePlans[programKey]?.plan ?? [];

    return plan
        // Keep only real course codes, ignore placeholders like "Breadth Option"
        .filter(item => /^[A-Z]{3,4}\s?\d{3}$/.test(item.code))
        .map(item => ({
            name: codeToName(item.code),      // e.g. "CPSC 231"
            id:   item.code.replace(' ', '')  // e.g. "CPSC231"
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

    /* -------- memoised data -------- */
    // Re‑compute the list only when the program key changes.
    const courses = useMemo(
        () => getCourses(program || 'CPSC'),
        [program]
    );

    /* -------- handlers -------- */
    const handleViewDetails = id => navigate(`/course/${id}`);

    /* -------- render -------- */
    return (
        <div className="DegreePage">
            <h1>
                Bachelor of {program ? program.toUpperCase() : 'CPSC'}
            </h1>

            <h2>Recommended Courses</h2>

            {courses.length === 0 ? (
                <p>No course plan found for this program.</p>
            ) : (
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
            )}
        </div>
    );
}