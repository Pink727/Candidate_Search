import React from 'react';
import Candidate from '../interfaces/Candidate.interface';
import '../styles/CandidateCard.css';

interface CandidateCardProps {
  candidate: Candidate;
}

// Component to display candidate information in a card format
const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <li className="candidate-card" key={candidate.id}>
      {/* Candidate avatar */}
      <img src={candidate.avatar_url} alt={candidate.login} width="50" />
      {/* Candidate GitHub profile link */}
      <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
        {candidate.login}
      </a>
      {/* Candidate name */}
      <p>Name: {candidate.name || 'user has not added that info'}</p>
      {/* Candidate bio */}
      <p>Bio: {candidate.bio || 'user has not added that info'}</p>
      {/* Candidate location */}
      <p>Location: {candidate.location || 'user has not added that info'}</p>
      {/* Candidate email */}
      <p>Email: {candidate.email || 'user has not added that info'}</p>
      {/* Candidate company */}
      <p>Company: {candidate.company || 'user has not added that info'}</p>
    </li>
  );
};

export default CandidateCard;