import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import DesignsPage from './pages/designs/DesignsPage';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/designs" element={<DesignsPage />} />
              
              {/* Protected Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <div className="container mx-auto py-8 px-4">
                      <h1 className="text-3xl font-bold">Profile Page</h1>
                      <p className="text-muted-foreground mt-2">Coming soon...</p>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/purchases"
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <div className="container mx-auto py-8 px-4">
                      <h1 className="text-3xl font-bold">My Purchases</h1>
                      <p className="text-muted-foreground mt-2">Coming soon...</p>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'superAdmin']}>
                    <div className="container mx-auto py-8 px-4">
                      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                      <p className="text-muted-foreground mt-2">Coming soon...</p>
                    </div>
                  </ProtectedRoute>
                }
              />
              
              {/* 404 Route */}
              <Route
                path="*"
                element={
                  <div className="container mx-auto py-16 px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                    <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
                  </div>
                }
              />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
