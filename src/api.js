import axios from 'axios'

const api = axios.create({
  baseURL: "http://ec2-44-211-162-227.compute-1.amazonaws.com:3001",

})

export default api;