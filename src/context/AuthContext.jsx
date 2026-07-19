import { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log('Token found:', token ? 'Yes' : 'No')

        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            fetchUser()
        } else {
            setLoading(false)
        }
    }, [])

    const fetchUser = async () => {
        try {
            console.log('Fetching user...')
            const response = await api.get('/auth/me')
            console.log('User fetched:', response.data)
            setUser(response.data)
        } catch (error) {
            console.error('Fetch user error:', error)
            localStorage.removeItem('token')
            delete api.defaults.headers.common['Authorization']
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const login = async (email, password) => {
        console.log('Login function called')
        const response = await api.post('/auth/login', { email, password })
        console.log('Login response:', response.data)

        const { access_token, user } = response.data

        localStorage.setItem('token', access_token)
        console.log('Token saved to localStorage')

        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
        console.log('Authorization header set')

        setUser(user)
        console.log('User state set')

        return user
    }

    const logout = () => {
        console.log('Logging out')
        localStorage.removeItem('token')
        delete api.defaults.headers.common['Authorization']
        setUser(null)
    }

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}