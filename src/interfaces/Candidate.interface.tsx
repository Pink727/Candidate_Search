// Interface to define the structure of a Candidate object
interface Candidate {
  login: string; // GitHub username
  id: number; // Unique identifier
  avatar_url: string; // URL to the avatar image
  html_url: string; // URL to the GitHub profile
  name: string; // Candidate's name
  location: string; // Candidate's location
  email: string; // Candidate's email
  company: string; // Candidate's company
  bio?: string; // Candidate's bio (optional)
}

export default Candidate;
