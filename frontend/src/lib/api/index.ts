import axios from 'axios'
import databaseService from './database'

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL
const isBrowser = typeof window !== undefined

// console.log(API_ENDPOINT)

export const api = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    const { response } = error
    let message = 'An unexpected error occurred'

    if (response) {
      if (response.data) {
        message = response.data.message

        return Promise.reject(message)
      }
      return Promise.reject(message)
    }
    return Promise.reject(message)
  }
)

const addTokenToRequest = async (request: any) => {
  if (!isBrowser || request.headers.Authorization) return request

  request.headers.Authorization = `Bearer`
  return request
}

api.interceptors.request.use(addTokenToRequest)

export const databaseApi = databaseService({ api })
