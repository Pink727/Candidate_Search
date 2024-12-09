import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: '60px' }}> {/* Add padding to avoid content being hidden behind the nav */}
        <Outlet />
      </main>
    </>
  );
}

export default App;
