import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Docs } from './pages/Docs';
import { API } from './pages/API';
import { Examples } from './pages/Examples';
import { Playground } from './pages/Playground';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="docs" element={<Docs />} />
          <Route path="docs/*" element={<Docs />} />
          <Route path="api" element={<API />} />
          <Route path="examples" element={<Examples />} />
          <Route path="playground" element={<Playground />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
