import React from 'react';

function ResumeUpload({ setResumeFile }) {
    const handleChange = (e) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            setResumeFile(event.target.result);
        };
        fileReader.readAsText(e.target.files[0]);
    };

    return (
        <div>
            {/* for now txt, then change to word, pdf */}
        <h3>Upload Resume (.txt)</h3>
        <input type="file" accept=".pdf,.docx" onChange={(e) => setResumeFile(e.target.files[0])} />
        </div>
    );
}

export default ResumeUpload;