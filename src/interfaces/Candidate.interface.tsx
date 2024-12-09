interface Candidate {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name?: string;
  location?: string;
  email?: string;
  company?: string;
}

export default Candidate;
