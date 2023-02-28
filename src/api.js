import axios from 'axios'

const api = axios.create({
  baseURL: "http://ec2-3-223-6-199.compute-1.amazonaws.com:3001",

})

export default api;