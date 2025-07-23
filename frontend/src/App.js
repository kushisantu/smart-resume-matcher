import React, { useState } from 'react';
import ResumeUpload from './components/ResumeUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import ResultsDisplay from './components/ResultsDisplay';
import './App.css';

function App() {
	const [resumeFile, setResumeFile] = useState('');
	const [jobDesc, setJobDesc] = useState('');
	const [result, setResult] = useState(null);

	const handleSubmit = async () => {
		const formData = new FormData();
		formData.append('resume', resumeFile);
		formData.append('job_description', jobDesc);

		const response = await fetch('http://localhost:5000/match', {
			method: 'POST',
			body: formData,
		});
	
		const data = await response.json();
		setResult(data);
	};

	return (
		<div className='App'>
			<div>Smart Resume Matcher</div>
			<ResumeUpload setResumeFile={setResumeFile} />
			<JobDescriptionInput setJobDesc={setJobDesc} />
			<button onClick={handleSubmit}>Analyze Match</button>
			{result && <ResultsDisplay result={result} />}
		</div>
	);
}

export default App;
