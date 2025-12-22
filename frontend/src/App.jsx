import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
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

// Component to conditionally render AI Chat
const ConditionalAIChat = () => {
  const location = useLocation();

  // Hide AI chat on resume workspace pages (they have AI Features Panel)
  const hideOnPaths = ['/resumes/new', '/workspace'];
  const isResumeWorkspace = hideOnPaths.some(path => location.pathname.startsWith(path)) ||
    location.pathname.match(/^\/resumes\/[^/]+$/) ||
    location.pathname.match(/^\/workspace\/[^/]+$/);

  if (isResumeWorkspace) {
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

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

        {/* Conditional AI Chat Assistant - hidden on resume workspace */}
        <ConditionalAIChat />
      </Router>
    </AuthProvider>
  );
}

export default App;
