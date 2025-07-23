import React from 'react';

function JobDescriptionInput({ setJobDesc }) {
    return (
        <div>
            <h3>Paste Job Description</h3>
            <textarea
                rows={10}
                cols={60}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the job description here..."
            />
        </div>
    );
}

export default JobDescriptionInput;