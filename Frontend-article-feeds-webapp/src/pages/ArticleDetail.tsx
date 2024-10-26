import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  author: string;
  likes: string[];
  dislikes: string[];
  blocks: string[];
  images: string[];
  tags: string[];
}

const ArticleDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const article: Article = location.state?.article;

  if (!article) {
    return <div>No article found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            ← Back to Dashboard
          </button>
          <div className="flex flex-col md:flex-row">
            {article.images.length > 0 && (
              <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
                <img
                  src={article.images[0]}
                  alt={article.title}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              </div>
            )}
            <div className={`${article.images.length > 0 ? 'md:w-1/2' : 'w-full'}`}>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {article.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6">{article.description}</p>
              <div className="prose prose-lg text-gray-800 mb-8">
                {article.content}
              </div>
              <div className="flex items-center text-gray-500 mb-4">
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <span className="text-lg mr-6">{article.author}</span>
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </span>
                <span className="text-lg">{article.category}</span>
              </div>
              <div className="flex space-x-2">
                {article.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
