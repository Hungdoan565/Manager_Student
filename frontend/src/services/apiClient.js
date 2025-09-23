import axios from 'axios'
import { supabase } from '@/lib/supabase'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:8000/api'
})

api.interceptors.request.use(async (config) => {
  try {
    const { data } = await supabase.auth.getSession()
    const token = data?.session?.access_token
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch {}
  return config
})

export default api
