import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCandidates = async () => {
    setLoading(true);
    const data = await searchGithub();
    setCandidates(data);
    setLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = await searchGithubUser(searchTerm);
    setCandidates([data]);
    setLoading(false);
    saveToLocalStorage(data);
  };

  const saveToLocalStorage = (candidate: Candidate) => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(candidate);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  };

  const loadFromLocalStorage = () => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setCandidates(savedCandidates);
  };

  useEffect(() => {
    loadFromLocalStorage();
    fetchCandidates();
  }, []);

  return (
    <div>
      <h1>Candidate Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by username"
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {candidates.map(candidate => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CandidateSearch;
