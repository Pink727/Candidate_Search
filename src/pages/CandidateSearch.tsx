import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import Candidate from '../interfaces/Candidate.interface';
import '../styles/CandidateSearch.css';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

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
  };

  const saveToLocalStorage = (candidate: Candidate) => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(candidate);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  };

  const handleSave = () => {
    if (candidates[currentIndex]) {
      saveToLocalStorage(candidates[currentIndex]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
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
          {candidates.length > 0 && currentIndex < candidates.length ? (
            <div className="candidate-container">
              <CandidateCard key={candidates[currentIndex].id} candidate={candidates[currentIndex]} />
              <div className="button-container">
                <button className="save-button" onClick={handleSave}>+</button>
                <button className="skip-button" onClick={handleSkip}>-</button>
              </div>
            </div>
          ) : (
            <p>No more candidates available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default CandidateSearch;
