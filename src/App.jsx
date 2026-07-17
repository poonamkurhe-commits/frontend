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
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#fff',
                color: '#1a1a2e',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
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