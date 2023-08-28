import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://dt-money-beta-ten.vercel.app',
})
