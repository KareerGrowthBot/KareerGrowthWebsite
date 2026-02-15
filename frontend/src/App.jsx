import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Stories from './pages/Stories';
import StoryDetail from './pages/StoryDetail';
import Blog from './pages/Blog';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminBlogs from './pages/AdminBlogs';
import AdminStories from './pages/AdminStories';
import AdminCommunity from './pages/AdminCommunity';
import AdminContact from './pages/AdminContact';
import AdminBlogForm from './pages/AdminBlogForm';
import AdminStoryForm from './pages/AdminStoryForm';
import AdminSeo from './pages/AdminSeo';
import AdminSettings from './pages/AdminSettings';
import AdminStats from './pages/AdminStats';
import SEO from './components/common/SEO';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('kg_admin_token');
  if (!token) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <SEO />
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/blogs" element={
            <ProtectedRoute>
              <AdminBlogs />
            </ProtectedRoute>
          } />
          <Route path="/admin/blogs/new" element={
            <ProtectedRoute>
              <AdminBlogForm />
            </ProtectedRoute>
          } />
          <Route path="/admin/blogs/edit/:id" element={
            <ProtectedRoute>
              <AdminBlogForm />
            </ProtectedRoute>
          } />
          <Route path="/admin/stories" element={
            <ProtectedRoute>
              <AdminStories />
            </ProtectedRoute>
          } />
          <Route path="/admin/stories/new" element={
            <ProtectedRoute>
              <AdminStoryForm />
            </ProtectedRoute>
          } />
          <Route path="/admin/stories/edit/:id" element={
            <ProtectedRoute>
              <AdminStoryForm />
            </ProtectedRoute>
          } />
          <Route path="/admin/community" element={
            <ProtectedRoute>
              <AdminCommunity />
            </ProtectedRoute>
          } />
          <Route path="/admin/contact" element={
            <ProtectedRoute>
              <AdminContact />
            </ProtectedRoute>
          } />
          <Route path="/admin/seo" element={
            <ProtectedRoute>
              <AdminSeo />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute>
              <AdminSettings />
            </ProtectedRoute>
          } />
          <Route path="/admin/stories/stats" element={
            <ProtectedRoute>
              <AdminStats type="stories" />
            </ProtectedRoute>
          } />
          <Route path="/admin/blogs/stats" element={
            <ProtectedRoute>
              <AdminStats type="blogs" />
            </ProtectedRoute>
          } />
          <Route path="*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/story/:id" element={<StoryDetail />} />
                <Route path="/blog" element={<Blog />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
