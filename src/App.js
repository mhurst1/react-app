import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Exercises from './pages/Exercises';
import Nutrition from './pages/Nutrition';
import Tutorials from './pages/Tutorials';
import CaseStudies from './pages/CaseStudies';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/nutrition" element={<Nutrition />} />
      <Route path="/tutorials" element={<Tutorials />} />
      <Route path="/case-studies" element={<CaseStudies />} />
    </Routes>
  );
}

export default App;