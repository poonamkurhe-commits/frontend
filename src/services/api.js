import axios from 'axios'

const api = axios.create({
    baseURL: 'https://backend-new-q11h.onrender.com',
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