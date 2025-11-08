import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageLayout from './layout/PageLayout';
import Jobs from './pages/Jobs';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
          <Route path="/" element={<div>Home</div>} />
            <Route path="/jobs" element={<Jobs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
