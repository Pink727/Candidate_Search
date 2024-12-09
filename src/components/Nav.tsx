import { Link } from 'react-router-dom';
import '../styles/Nav.css';

// Component for the navigation bar
const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        {/* Navigation item for Home */}
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        {/* Navigation item for Potential Candidates */}
        <li className="nav-item">
          <Link to="/SavedCandidates" className="nav-link">Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
