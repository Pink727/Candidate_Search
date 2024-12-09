import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import Candidate from '../interfaces/Candidate.interface';
import '../styles/CandidateSearch.css';

// Main component for candidate search functionality
const CandidateSearch = () => {
  // State to store the list of candidates
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  // State to manage loading status
  const [loading, setLoading] = useState(false);
  // State to store the search term input by the user
  const [searchTerm, setSearchTerm] = useState('');
  // State to keep track of the current candidate index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to fetch all candidates from GitHub
  const fetchCandidates = async () => {
    setLoading(true); // Set loading to true while fetching data
    const data = await searchGithub(); // Fetch data from GitHub
    setCandidates(data); // Update candidates state with fetched data
    setLoading(false); // Set loading to false after data is fetched
  };

  // Function to handle search form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading to true while fetching data
    const data = await searchGithubUser(searchTerm); // Fetch data for the specific user
    setCandidates([data]); // Update candidates state with fetched user data
    setLoading(false); // Set loading to false after data is fetched
  };

  // Function to save a candidate to local storage
  const saveToLocalStorage = (candidate: Candidate) => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]'); // Get saved candidates from local storage
    savedCandidates.push(candidate); // Add new candidate to the saved list
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates)); // Save updated list back to local storage
  };

  // Function to handle saving the current candidate
  const handleSave = () => {
    if (candidates[currentIndex]) { // Check if there is a candidate at the current index
      saveToLocalStorage(candidates[currentIndex]); // Save the current candidate to local storage
      setCurrentIndex(currentIndex + 1); // Move to the next candidate
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
        <br />
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
