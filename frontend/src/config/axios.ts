import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
// interceptor es un mecanismo para injectar el token en las diferentes llamadas de seguridad de la plicacion y se manda a llama en automatico y es algo que se hara en cada peticion ==> el req reescribe la configuracion

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config       
})

export default api