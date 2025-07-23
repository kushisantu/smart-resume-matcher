from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
import re

def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    return text

def get_missing_keywords(resume, job_description):
    resume = clean_text(resume)
    jd = clean_text(job_description)

    stop_words = set(stopwords.words('english'))
    resume_words = set(resume.split()) - stop_words
    jd_words = set(jd.split()) - stop_words

    missing = list(jd_words - resume_words)
    score = 100 - (len(missing) / max(len(jd_words), 1)) * 100
    return round(score, 2), missing