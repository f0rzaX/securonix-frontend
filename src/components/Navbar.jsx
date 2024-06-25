import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { jwtDecode } from 'jwt-decode';


const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/');
    };
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
            navigate('/');
        }
        else {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
          
            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                console.log("Token Expired")
                dispatch(logout());
                navigate('/');
            }
        }
    }, [navigate]);

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white">
                    {location.pathname === '/upload' && (
                        <button onClick={() => navigate('/visualize')} className="mr-4">
                            Visualize
                        </button>
                    )}
                    {location.pathname === '/visualize' && (
                        <button onClick={() => navigate('/upload')} className="mr-4">
                            Upload
                        </button>
                    )}
                </div>
                {(location.pathname === '/upload' || location.pathname === '/visualize') && (
                    <button onClick={handleLogout} className="text-white">
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
