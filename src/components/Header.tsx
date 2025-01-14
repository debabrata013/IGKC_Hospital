import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { logout } from '../store/slices/authSlice';

const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">IGKC</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
          <li><Link to="/about" className="hover:text-blue-500">About</Link></li>
          {user ? (
            <>
              <li>
                <Link 
                  to={user.role === 'admin' ? '/admin-dashboard' : user.role === 'doctor' ? '/doctor-dashboard' : '/dashboard'} 
                  className="hover:text-blue-500"
                >
                  Dashboard
                </Link>
              </li>
              <li><button onClick={handleLogout} className="hover:text-blue-500">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-blue-500">Login</Link></li>
              <li><Link to="/signup" className="hover:text-blue-500">Signup</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;


