import React, { useEffect, useState } from 'react';
import Candidate from '../interfaces/Candidate.interface';
import '../styles/SavedCandidates.css';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [sortKey, setSortKey] = useState<string>('name');
  const [filterText, setFilterText] = useState<string>('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  const deleteCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    setSavedCandidates(updatedCandidates);
  };

  const handleSort = (key: string) => {
    setSortKey(key);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const getFilteredCandidates = () => {
    return savedCandidates.filter(candidate =>
      (candidate.name?.toLowerCase() ?? '').includes(filterText.toLowerCase()) ||
      (candidate.location?.toLowerCase() ?? '').includes(filterText.toLowerCase()) ||
      (candidate.email?.toLowerCase() ?? '').includes(filterText.toLowerCase()) ||
      (candidate.company?.toLowerCase() ?? '').includes(filterText.toLowerCase())
    );
  };

  const getSortedCandidates = (candidates: Candidate[]) => {
    const key = sortKey as keyof Candidate;
    return candidates.sort((a, b) => {
      const aValue = a[key] ?? '';
      const bValue = b[key] ?? '';
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });
  };

  const displayedCandidates = getSortedCandidates(getFilteredCandidates());

  return (
    <div>
      <h1>Saved Candidates</h1>
      <div>
        <label>
          Filter:
          <input type="text" value={filterText} onChange={handleFilter} />
        </label>
        <label>
          Sort by:
          <select value={sortKey} onChange={(e) => handleSort(e.target.value)}>
            <option value="name">Name</option>
            <option value="location">Location</option>
            <option value="email">Email</option>
            <option value="company">Company</option>
          </select>
        </label>
      </div>
      {displayedCandidates.length === 0 ? (
        <p>No candidates have been accepted.</p>
      ) : (
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
                <td><button onClick={() => deleteCandidate(candidate.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;
