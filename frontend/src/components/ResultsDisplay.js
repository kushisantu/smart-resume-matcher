import React from 'react';

function ResultsDisplay({ result }) {
    return (
        <div>
        <h3>Match Results</h3>
        <p><strong>Match Score:</strong> {result.match_score}%</p>
        <p><strong>Missing Keywords:</strong></p>
        <ul>
            {result.missing_keywords.map((word, index) => (
            <li key={index}>{word}</li>
            ))}
        </ul>
        </div>
    );
}

export default ResultsDisplay;