import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageLayout from './layout/PageLayout';
import Jobs from './pages/Jobs';
import { Login } from './components/Login';
import { Register } from './components/Register';
import JobForm from './components/JobForm';
import Home from './pages/Home';
import { useUserStore } from './store/userStore';
import { GoogleOAuthProvider } from '@react-oauth/google';
import JobPage from './pages/JobPage';

function App() {
  const user = localStorage.getItem('user');
  if (user) {
    useUserStore.setState({ user: JSON.parse(user) });
  } else {
    useUserStore.setState({ user: null });
  }

  console.log('client id', process.env.REACT_APP_GOOGLE_CLIENT_ID);
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
        <BrowserRouter>
          <Routes>
            <Route element={<PageLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/job-form" element={<JobForm />} />
              <Route path="/jobs/:id" element={<JobPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
