import axios from 'axios'

import { LocalStorageApi } from '@/utils/localStorage.utils'

const { REACT_APP_API_URL } = process.env

export const instance = axios.create({
  baseURL: REACT_APP_API_URL
})

instance.interceptors.request.use((config) => {
  const token = LocalStorageApi.getToken()

  if (token) config.headers['x-auth'] = token

  return config
})
