import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import AuthPage from './pages/auth';
import Home from './pages/home';
import Rated from './pages/rated';
import { Movie, TvShow} from './pages/movie_n_tvshow';

function App() {
  return (
    <div>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/rated" element={<Rated />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/tvshow/:id" element={<TvShow />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
