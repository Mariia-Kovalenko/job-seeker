import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageLayout from './layout/PageLayout';
import Jobs from './pages/Jobs';
import { Login } from './components/Login';
import { Register } from './components/Register';
import JobForm from './components/JobForm';
import Home from './pages/Home';
import { useUserStore } from './store/userStore';

function App() {
  const user = localStorage.getItem('user');
  if (user) {
    useUserStore.setState({ user: JSON.parse(user) });
  } else {
    useUserStore.setState({ user: null });
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/job-form" element={<JobForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
