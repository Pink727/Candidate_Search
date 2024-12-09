import React, { useEffect, useState } from 'react';
import Candidate from '../interfaces/Candidate.interface';
import '../styles/SavedCandidates.css';

const SavedCandidates: React.FC = () => {
  // State to store the list of saved candidates
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  // State to store the key by which candidates will be sorted
  const [sortKey, setSortKey] = useState<string>('name');
  // State to store the text used for filtering candidates
  const [filterText, setFilterText] = useState<string>('');

  // Effect to load saved candidates from local storage when the component mounts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  // Function to delete a candidate by id
  const deleteCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    setSavedCandidates(updatedCandidates);
  };

  // Function to handle sorting by a specific key
  const handleSort = (key: string) => {
    setSortKey(key);
  };

  // Function to handle filtering based on input text
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  // Function to get the list of candidates filtered by the filter text
  const getFilteredCandidates = () => {
    return savedCandidates.filter(candidate =>
      (candidate.name?.toLowerCase() ?? '').includes(filterText.toLowerCase()) ||
      (candidate.location?.toLowerCase() ?? '').includes(filterText.toLowerCase()) ||
      (candidate.email?.toLowerCase() ?? '').includes(filterText.toLowerCase()) ||
      (candidate.company?.toLowerCase() ?? '').includes(filterText.toLowerCase()) ||
      (candidate.login?.toLowerCase() ?? '').includes(filterText.toLowerCase())
    );
  };

  // Function to sort candidates based on the selected sort key
  const getSortedCandidates = (candidates: Candidate[]) => {
    const key = sortKey as keyof Candidate; // Determine the key to sort by
    return candidates.sort((a, b) => {
      const aValue = a[key] ?? ''; // Get the value of the key for candidate a
      const bValue = b[key] ?? ''; // Get the value of the key for candidate b
      if (aValue < bValue) return -1; // If a's value is less than b's value, sort a before b
      if (aValue > bValue) return 1; // If a's value is greater than b's value, sort a after b
      return 0; // If values are equal, maintain original order
    });
  };

  // Get the filtered and sorted list of candidates to be displayed
  const displayedCandidates = getSortedCandidates(getFilteredCandidates());

  return (
    <div>
      <h1>Potential Candidates</h1>
      <div className="filter-sort-container">
        {/* Filter input field */}
        <label className="filter-label">
          Filter: <input type="text" value={filterText} onChange={handleFilter} className="filter-input" />
        </label>
        {/* Sort dropdown */}
        <label className="sort-label">
          Sort by:
          <select value={sortKey} onChange={(e) => handleSort(e.target.value)}>
            <option value="name">Name</option>
            <option value="location">Location</option>
            <option value="email">Email</option>
            <option value="company">Company</option>
          </select>
        </label>
      </div>
      {/* Display message if no candidates are available */}
      {displayedCandidates.length === 0 ? (
        <p>No candidates have been accepted.</p>
      ) : (
        // Display table of candidates
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th className="bio-column">BIO</th>
              <th>GitHub</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {displayedCandidates.map((candidate, index) => (
              <tr key={candidate.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td><img src={candidate.avatar_url} alt={candidate.name} /></td>
                <td>{candidate.name}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email}</td>
                <td>{candidate.company}</td>
                <td className="bio-column">{candidate.bio}</td>
                <td><a href={`https://github.com/${candidate.login}`} target="_blank" rel="noopener noreferrer">{candidate.login}</a></td>
                <td><button className="delete-button" onClick={() => deleteCandidate(candidate.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;
