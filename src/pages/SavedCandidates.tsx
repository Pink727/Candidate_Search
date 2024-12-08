import { useState } from 'react';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates] = useState<Candidate[]>([]);

  return (
    <div>
      <h1>Saved Candidates</h1>
      <ul>
        {savedCandidates.map(candidate => (
          <li key={candidate.id}>
            <img src={candidate.avatar_url} alt={candidate.login} width="50" />
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              {candidate.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCandidates;
