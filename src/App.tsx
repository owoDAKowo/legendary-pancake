import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import AuthPage from './pages/auth';
import Home from './pages/home';
import Rated from './pages/rated';



function App() {
  return (
    <div>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth" element={<AuthPage />} /> // Use AuthPage as a child element
          <Route path="/rated" element={<Rated/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
