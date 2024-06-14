import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className=''>
      <div className=''>
        <button onClick={() => navigate('/about')}>to about</button>
      </div>
      this is home
    </div>
  );
};

const About = () => {
  const navigate = useNavigate();
  return (
    <div className=''>
      <div className=''>
        <button onClick={() => navigate('/')}>to home</button>
      </div>
      this is about
    </div>
  );
};

function App() {
  return (
    <Router basename='/'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
