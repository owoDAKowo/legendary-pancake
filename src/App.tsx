import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import AuthPage from './pages/auth';
import Home from './pages/home';
import Rated from './pages/rated';
import { Movie, TvShow} from './pages/movie_n_tvshow';
import { FloatButton, Layout } from 'antd';

const {Content}=Layout;
function App() {
  return (
    <div>
      <Router>
        <Layout>
        <NavBar/>
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/rated" element={<Rated />} />
              <Route path="/movie/:id" element={<Movie />} />
              <Route path="/tvshow/:id" element={<TvShow />} />
            </Routes>
          </Content>
        <FloatButton.BackTop />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
