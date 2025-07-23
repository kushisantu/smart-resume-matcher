from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from utils.parser import extract_text_from_pdf, extract_text_from_docx
from utils.matcher import get_missing_keywords

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/match', methods=['POST'])
def match_resume():
    file = request.files.get('resume')
    job_description = request.form.get('job_description')

    if not file or not job_description:
        return jsonify({'error': 'Resume or job description missing'}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Extract text
    if file.filename.endswith('.pdf'):
        resume_text = extract_text_from_pdf(file_path)
    elif file.filename.endswith('.docx'):
        resume_text = extract_text_from_docx(file_path)
    else:
        return jsonify({'error': 'Unsupported file type'}), 400

    # NLP matching
    score, missing = get_missing_keywords(resume_text, job_description)

    return jsonify({
        'match_score': score,
        'missing_keywords': missing,
        'word_count': len(resume_text.split())
    })

if __name__ == '__main__':
    app.run(debug=True)