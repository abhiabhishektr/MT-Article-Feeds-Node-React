import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>

        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/article-detail" element={<ArticleDetail />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/create-article" element={<ArticleCreationPage />} />
            <Route path="/edit-article/:id" element={<ArticleEditPage />} />
          </Route>
        </Routes>

        <Toaster />
      </AuthProvider>
    </>
  );
};

export default App;
