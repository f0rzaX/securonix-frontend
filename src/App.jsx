import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import UploadPage from './pages/UploadPage';
import VisualizePage from './pages/VisualizePage';
import Navbar from './components/Navbar';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
    const location = useLocation();

    return (
        <div>
            {(location.pathname === '/upload' || location.pathname === '/visualize') && <Navbar />}
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/upload" element={<UploadPage />} />
                    <Route path="/visualize" element={<VisualizePage />} />
                </Routes>
            </GoogleOAuthProvider>
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
