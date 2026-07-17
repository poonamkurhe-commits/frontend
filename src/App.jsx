import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Subject from './pages/Subject'
import MCQ from './pages/MCQ'
import Viva from './pages/Viva'
import Coding from './pages/Coding'
import Result from './pages/Result'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                fontFamily: 'Inter, sans-serif',
                borderRadius: '12px',
                padding: '16px 24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                fontWeight: 'bold'
              },
              success: {
                duration: 4000,
                style: {
                  background: '#10b981',
                  color: '#fff',
                },
              },
              error: {
                duration: 4000,
                style: {
                  background: '#ff6b6b',
                  color: '#fff',
                },
              }
            }}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/subject/:subject" element={
              <ProtectedRoute>
                <Subject />
              </ProtectedRoute>
            } />
            <Route path="/mcq/:subject" element={
              <ProtectedRoute>
                <MCQ />
              </ProtectedRoute>
            } />
            <Route path="/viva/:subject" element={
              <ProtectedRoute>
                <Viva />
              </ProtectedRoute>
            } />
            <Route path="/coding/:subject" element={
              <ProtectedRoute>
                <Coding />
              </ProtectedRoute>
            } />
            <Route path="/result" element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App