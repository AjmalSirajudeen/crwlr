import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DiscoverPage from './pages/DiscoverPage';
import CrawlsPage from './pages/CrawlsPage';
import CrawlDetailPage from './pages/CrawlDetailPage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={
        <ProtectedRoute>
          <DiscoverPage />
        </ProtectedRoute>
      } />
      <Route path="/crawls" element={
        <ProtectedRoute>
          <CrawlsPage />
        </ProtectedRoute>
      } />
      <Route path="/crawls/:id" element={
        <ProtectedRoute>
          <CrawlDetailPage />
        </ProtectedRoute>
      } />
      <Route path="/leaderboard" element={
        <ProtectedRoute>
          <LeaderboardPage />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;