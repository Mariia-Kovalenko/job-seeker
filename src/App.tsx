import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageLayout from './layout/PageLayout';
import Jobs from './pages/Jobs';
import { Login } from './components/Login';
import { Register } from './components/Register';
import Home from './pages/Home';
import { useUserStore } from './store/userStore';
import { GoogleOAuthProvider } from '@react-oauth/google';
import JobPage from './pages/JobPage';
import Profile from './pages/Profile';
import {isTokenExpired} from './utils/jwtUtils'

function App() {
  // TODO: improve to use refresh token
  const user = localStorage.getItem('user');
  if (user) {
    useUserStore.setState({ user: JSON.parse(user) });

    // check if user token expired. If yes, logout
   const token = JSON.parse(user).token;

   const isExpired = isTokenExpired(token);
   if (isExpired) {
    useUserStore.getState().logout();
   }

  } else {
    useUserStore.setState({ user: null });
  }

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
              <Route path="/jobs/:id" element={<JobPage />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
