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
import {isTokenExpired} from './utils/jwtUtils';
import { useState, useEffect } from 'react';
import ScrollTop from './common/ScrollTop';
import ScrollToTop from './common/ScrollToTop';
import { useTheme } from './context/ThemeContext';

function App() {
  const [showButton, setShowButton] = useState(false);
  const {theme} = useTheme();
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

  const onScroll = () => {
    window.scrollY > 800 ? setShowButton(true) : setShowButton(false);
  };

  useEffect(() => {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
  });

  const scrollToTop = () => {
      window.scrollTo(0, 0);
  };


  return (
    <div className={`App ${theme == "dark" ? "bg-darkBackground": ""}`}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
        <BrowserRouter>
          <ScrollTop />
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
      {showButton && <ScrollToTop onClick={scrollToTop} />}
    </div>
  );
}

export default App;
