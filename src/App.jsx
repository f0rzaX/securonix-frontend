import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import UploadPage from './pages/UploadPage';
import VisualizePage from './pages/VisualizePage';
import Navbar from './components/Navbar';
import GoogleSignInWrapper from './components/GoogleSignIn';

const App = () => {
    const location = useLocation();
  
    return (
      <div>
        {(location.pathname === '/upload' || location.pathname === '/visualize') && <Navbar />}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/visualize" element={<VisualizePage />} />
          <Route path="/google" element={<GoogleSignInWrapper />} />
        </Routes>
      </div>
    );
  };
  
  const AppWrapper = () => (
    <Router>
      <App />
    </Router>
  );
  
  export default AppWrapper;
  