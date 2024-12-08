import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li className="nav-item">
          <Link to="/" className="nav-link">Search Candidates</Link>
        </li>
        <li className="nav-item">
          <Link to="/SavedCandidates" className="nav-link">Saved Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
