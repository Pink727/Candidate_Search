import React from 'react';
import Candidate from '../interfaces/Candidate.interface';

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <li key={candidate.id}>
      <img src={candidate.avatar_url} alt={candidate.login} width="50" />
      <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
        {candidate.login}
      </a>
    </li>
  );
};

export default CandidateCard;