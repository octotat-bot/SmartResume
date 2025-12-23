import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ResumesPage from './pages/ResumesPage';
import ResumeWorkspace from './pages/ResumeWorkspace';
import TemplatesPage from './pages/TemplatesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProfilePage from './pages/ProfilePage';
import ApplicationTracker from './pages/ApplicationTracker';
import NotFoundPage from './pages/NotFoundPage';

// AI Components
import AIChatAssistant from './components/AIChatAssistant';

// Public Route Component - shows landing page to non-authenticated users
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  // If user is authenticated and not already on dashboard, redirect to dashboard
  if (isAuthenticated && location.pathname !== '/dashboard') {
    return <Navigate to="/dashboard" replace />;
  }

  // If user is authenticated and on dashboard, don't render children
  if (isAuthenticated) {
    return null;
  }

  return children;
};

// Component to conditionally render AI Chat
const ConditionalAIChat = () => {
  const location = useLocation();

  // Hide AI chat on resume workspace pages and public pages
  const hideOnPaths = ['/resumes/new', '/workspace', '/', '/login', '/register'];
  const shouldHide = hideOnPaths.some(path => location.pathname === path || location.pathname.startsWith(path)) ||
    location.pathname.match(/^\/resumes\/[^/]+$/) ||
    location.pathname.match(/^\/workspace\/[^/]+$/);

  if (shouldHide) {
    return null;
  }

  return <AIChatAssistant />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />

          {/* Protected Routes with Layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/resumes"
            element={
              <ProtectedRoute>
                <Layout>
                  <ResumesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/resumes/new"
            element={
              <ProtectedRoute>
                <ResumeWorkspace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resumes/:id"
            element={
              <ProtectedRoute>
                <ResumeWorkspace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workspace"
            element={
              <ProtectedRoute>
                <Layout>
                  <ResumesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/workspace/:id"
            element={
              <ProtectedRoute>
                <ResumeWorkspace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates"
            element={
              <ProtectedRoute>
                <Layout>
                  <TemplatesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <Layout>
                  <ApplicationTracker />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Layout>
                  <AnalyticsPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>

        {/* Conditional AI Chat Assistant */}
        <ConditionalAIChat />
      </Router>
    </AuthProvider>
  );
}

export default App;
