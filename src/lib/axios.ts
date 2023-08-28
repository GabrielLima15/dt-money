import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-dt-money.onrender.com',
})
