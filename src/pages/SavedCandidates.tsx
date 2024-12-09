import React, { useEffect, useState } from 'react';
import CandidateCard from '../components/CandidateCard';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  const deleteCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates have been accepted.</p>
      ) : (
        <ul>
          {savedCandidates.map(candidate => (
            <li key={candidate.id}>
              <CandidateCard candidate={candidate} />
              <button onClick={() => deleteCandidate(candidate.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;
