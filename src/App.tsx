import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Services from './pages/Services';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import StudentDashboard from './pages/student/StudentDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import TutorDashboard from './pages/tutor/TutorDashboard';
import VerticalHeadDashboard from './pages/verticalhead/VerticalHeadDashboard';
import TeamLeaderDashboard from './pages/teamleader/TeamLeaderDashboard';
import FreelancerDashboard from './pages/freelancer/FreelancerDashboard';
import BDADashboard from './pages/bda/BDADashboard';
import SalesDashboard from './pages/sales/SalesDashboard';
import ScheduleTutor from './pages/ScheduleTutor';
import Events from './pages/Events';
import Careers from './pages/Careers';
import About from './pages/About';
import BecomeTutor from './pages/BecomeTutor';
import BecomePartner from './pages/BecomePartner';
import RegistrationManagement from './pages/admin/RegistrationManagement';

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { currentUser, userProfile } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }
  
  if (allowedRoles && userProfile && !allowedRoles.includes(userProfile.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { currentUser, userProfile } = useAuth();

  // Auto-redirect based on role after login
  const getDashboardPath = () => {
    if (!userProfile) return '/';
    
    switch (userProfile.role) {
      case 'admin':
        return '/admin-dashboard';
      case 'vertical_head':
        return '/vh-dashboard';
      case 'manager':
        return '/manager-dashboard';
      case 'team_leader':
        return '/tl-dashboard';
      case 'tutor':
        return '/tutor-dashboard';
      case 'freelancer':
        return '/freelancer-dashboard';
      case 'bda':
        return '/bda-dashboard';
      case 'sales':
        return '/sales-dashboard';
      default:
        return '/student-dashboard';
    }
  };

  const shouldShowFooter = () => {
    const currentPath = window.location.pathname;
    return currentPath === '/' || currentPath === '/about' || currentPath === '/services' || 
           currentPath === '/events' || currentPath === '/careers';
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/events" element={<Events />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/about" element={<About />} />
          <Route path="/become-tutor" element={<BecomeTutor />} />
          <Route path="/become-partner" element={<BecomePartner />} />
          <Route 
            path="/signup" 
            element={currentUser ? <Navigate to={getDashboardPath()} replace /> : <SignUp />} 
          />
          <Route 
            path="/signin" 
            element={currentUser ? <Navigate to={getDashboardPath()} replace /> : <SignIn />} 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/student-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/manager-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['manager']}>
                <ManagerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tutor-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <TutorDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vh-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['vertical_head']}>
                <VerticalHeadDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tl-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['team_leader']}>
                <TeamLeaderDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/freelancer-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['freelancer']}>
                <FreelancerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bda-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['bda']}>
                <BDADashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sales-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['sales']}>
                <SalesDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/registrations" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <RegistrationManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/schedule-tutor" 
            element={
              <ProtectedRoute>
                <ScheduleTutor />
              </ProtectedRoute>
            } 
          />
          
          {/* Placeholder routes for future development */}
          <Route path="/tech-box" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Tech Box - Coming Soon</h1></div>} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {shouldShowFooter() && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;