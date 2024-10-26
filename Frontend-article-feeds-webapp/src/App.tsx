import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ArticleDetail from './pages/ArticleDetail';
import SettingsPage from './pages/SettingsPage';
import ArticleCreationPage from './pages/ArticleCreationPage';
import ArticleEditPage from './pages/ArticleEditPage';
import { Toaster } from "@/components/ui/toaster"
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { AuthProvider } from './context/AuthContext';
import   LandingPage  from './components/LandingPage';
import Navbar from '@/components/my/Navbar';
import UserArticlesPage from './pages/UserArticlesPage';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route path="/" element={<LandingPage />} />
          <Route element={<PrivateRoute />}>
            <Route
              element={
                <>
                  <Navbar />
                  <Outlet />
                </>
              }
            >
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/article-detail" element={<ArticleDetail />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/create-article" element={<ArticleCreationPage />} />
              <Route path="/user-article" element={<UserArticlesPage />} />
              <Route path="/edit-article/:id" element={<ArticleEditPage />} />
            </Route>
          </Route>
        </Routes>

        <Toaster />
      </AuthProvider>
    </>
  );
};

export default App;




// setArticles((prev) => prev.filter(article => article.id !== id));
//dislike 
//       setArticles((prev) => prev.map(article => article.id === id ? { ...article, dislikes: article.dislikes + 1 } : article));

// like
//       setArticles((prev) => prev.map(article => article.id === id ? { ...article, likes: article.likes + 1 } : article));
