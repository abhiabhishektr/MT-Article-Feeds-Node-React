import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook
import { FaCog } from 'react-icons/fa'; // Import settings icon from react-icons

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const { isAuthenticated, logout } = useAuth(); // Access isAuthenticated and logout function

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate('/'); // Redirect to home after logging out
  };

  return (
    <nav className="bg-gradient-to-r from-blue-100 to-purple-100 py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-extrabold text-gray-900">
            NewsFeed
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/create-article" className="text-gray-700 hover:text-purple-600">
            Create
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-purple-600">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-purple-600">
            Contact
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            location.pathname === '/settings' ? (
              <Button
                variant="outline"
                className={cn("text-primary")}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <FaCog
                onClick={() => navigate('/settings')}
                className="text-gray-700 hover:text-purple-600 cursor-pointer text-xl"
                title="Settings"
              />
            )
          ) : (
            <>
              <Button
                variant="outline"
                className={cn("text-primary")}
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button
                variant="default"
                className={cn("bg-purple-600 text-white")}
                onClick={() => navigate('/register')}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
