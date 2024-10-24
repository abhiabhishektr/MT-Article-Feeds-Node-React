// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Article } from '../types';
// import ArticleCard from '../components/ArticleCard';

// const DashboardPage: React.FC = () => {
//   const [articles, setArticles] = useState<Article[]>([]);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       const response = await axios.get('/api/articles'); // Fetch articles based on user preferences
//       setArticles(response.data);
//     };
//     fetchArticles();
//   }, []);

//   return (
//     <div>
//       <h1>Your Dashboard</h1>
//       {articles.map((article) => (
//         <ArticleCard key={article.id} article={article} />
//       ))}
//     </div>
//   );
// };

// export default DashboardPage;

// Frontend-article-feeds-webapp/src/pages/Dashboard.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
// import { useToast } from '@/components/ui/use-toast';

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

  const sampleArticles: Article[] = [
    {
      id: '1',
      title: 'Understanding React Hooks',
      description: 'This article explains the basics of React Hooks and how to use them in your applications.',
      category: 'React',
      content: 'React Hooks are functions that let you use state and other React features without writing a class. This article covers how to effectively utilize hooks in your components.',
      author: 'User1',
      likes: ['userId1', 'userId2'], 
      dislikes: ['userId3'], 
      blocks: [], 
      images: ["https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"], // URLs for article images
      tags: ['React', 'Hooks', 'JavaScript'],
    },
    {
      id: '2',
      title: 'A Guide to JavaScript Promises',
      description: 'This article provides a comprehensive guide on JavaScript promises and asynchronous programming.',
      category: 'JavaScript',
      content: 'Promises are a way to handle asynchronous operations in JavaScript. This article explores their syntax and usage with practical examples.',
      author: 'User2',
      likes: ['userId1'],
      dislikes: [],
      blocks: [],
      images: ["https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"],
      tags: ['JavaScript', 'Promises', 'Asynchronous'],
    },
    {
      id: '3',
      title: 'CSS Flexbox: A Beginner’s Guide',
      description: 'Learn how to create flexible and responsive layouts using CSS Flexbox in this beginner’s guide.',
      category: 'CSS',
      content: 'Flexbox is a layout model that allows for responsive design. This guide explains its properties and how to implement them.',
      author: 'User3',
      likes: ['userId2', 'userId3'],
      dislikes: [],
      blocks: [],
      images: ["https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"],
      tags: ['CSS', 'Flexbox', 'Responsive Design'],
    },
    
    {
      id: '4',
      title: 'CSS Flexbox: A Beginner’s Guide',
      description: 'Learn how to create flexible and responsive layouts using CSS Flexbox in this beginner’s guide.',
      category: 'CSS',
      content: 'Flexbox is a layout model that allows for responsive design. This guide explains its properties and how to implement them.',
      author: 'User3',
      likes: ['userId2', 'userId3'],
      dislikes: [],
      blocks: [],
      images: ["https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"],
      tags: ['CSS', 'Flexbox', 'Responsive Design'],
    },
    
  ];

  
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
//   const { toast } = useToast();
  

const [articles, setArticles] = useState<Article[]>(sampleArticles);
const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // const response = await axios.get('/api/articles');
        // setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
        // toast({
        //   title: 'Error',
        //   description: 'Failed to fetch articles. Please try again.',
        //   variant: 'destructive',
        // });
        alert('Failed to fetch articles. Please try again.');
      }
    };

    fetchArticles();
  }, [alert]);
//   }, [toast]);



const handleArticleClick = (article: Article) => {
    navigate('/article-detail', { state: { article } }); // Navigate with article state
  };


  const handleLike = async (id: string) => {
//     try {
//       await axios.post(`/api/articles/${id}/like`);
//       setArticles((prev) => prev.map(article => article.id === id ? { ...article, likes: article.likes + 1 } : article));
//     //   toast({
//     //     title: 'Liked',
//     //     description: 'You liked the article!',
//     //   });
//     alert('Liked');
//     } catch (error) {
//       console.error('Error liking article:', error);
//     }
  };

  const handleDislike = async (id: string) => {
//     try {
//       await axios.post(`/api/articles/${id}/dislike`);
//       setArticles((prev) => prev.map(article => article.id === id ? { ...article, dislikes: article.dislikes + 1 } : article));
//     //   toast({
//     //     title: 'Disliked',
//     //     description: 'You disliked the article!',
//     //   });
//     alert('Disliked');  
//     } catch (error) {
//       console.error('Error disliking article:', error);
//     }
  };

  const handleBlock = async (id: string) => {
//     try {
//       await axios.post(`/api/articles/${id}/block`);
//       setArticles((prev) => prev.filter(article => article.id !== id));
//     //   toast({
//     //     title: 'Blocked',
//     //     description: 'Article has been blocked.',
//     //   });
//     alert('Blocked');
//     } catch (error) {
//       console.error('Error blocking article:', error);
//     }
  };



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <h1 className="text-3xl font-extrabold mb-6">Article Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(articles) && articles.map((article) => (
          <div key={article.id} className="bg-white p-4 rounded-lg shadow-md">
            {article.images.length > 0 && ( // Check if images exist
              <img src={article.images[0]} alt={article.title} className="w-full h-48 object-cover rounded" /> // Render the image
            )}
            <h2 className="font-bold text-lg mt-2">{article.title}</h2>
            <p className="text-sm">{article.description}</p>
            <Button className="mt-2" onClick={() => handleArticleClick(article)}>
              View Article
            </Button>
            <div className="mt-4 flex justify-between">
              <Button onClick={() => handleLike(article.id)}>👍 {article.likes.length}</Button>
              <Button onClick={() => handleDislike(article.id)}>👎 {article.dislikes.length}</Button>
              <Button onClick={() => handleBlock(article.id)} variant="destructive">Block</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Dashboard;

