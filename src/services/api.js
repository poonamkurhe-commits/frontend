import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json'
    }
})

// ✅ हा interceptor add करा (token automatically send होईल)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        console.log('Token:', token)  // Debug साठी
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default api