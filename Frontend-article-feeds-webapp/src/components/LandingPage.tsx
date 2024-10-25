import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const openGitHubLink = () => {
    window.open('https://github.com/abhiabhishektr', '_blank');
  };

  return (
    <div className="min-h-screen flex bg-gray-50 relative">
      {/* Image Section */}
      <div className="hidden lg:block relative w-1/2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-900 opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-white">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4">Stay Informed.</h1>
            <p className="text-xl">Your Source for the Latest News and Articles.</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-8 px-6 py-3 bg-white text-blue-500 font-semibold rounded-full shadow-md hover:bg-blue-100 focus:outline-none"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-8"> 
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Never Miss an Important Update
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Our platform provides you with curated content from trusted sources,
            ensuring you're always in the loop. Sign up today and start exploring!
          </p> 
        </div>
      </div>

      {/* GitHub Image - Repositioned and Improved */}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center'>
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub Logo"
          className="cursor-pointer w-12 h-12 rounded-full hover:opacity-80 transition-opacity"
          onClick={openGitHubLink}
        />
        <span className="mt-2 text-[.6rem] text-black">source code</span>
      </div>
    </div>
  );
};

export default LandingPage;
