import axios from 'axios'
const instance = axios.create({
    baseURL:'http://localhost:3000',
      timeout:5000
})
instance.interceptors.response.use(res=>{
    return res.data
},err=>{
    return err
})
export default instance