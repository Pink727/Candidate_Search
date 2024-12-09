import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates have been accepted.</p>
      ) : (
        <ul>
          {savedCandidates.map(candidate => (
            <li key={candidate.id}>
              <img src={candidate.avatar_url} alt={candidate.login} width="50" />
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                {candidate.login}
              </a>
              <p>Name: {candidate.name}</p>
              <p>Location: {candidate.location}</p>
              <p>Email: {candidate.email}</p>
              <p>Company: {candidate.company}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;
