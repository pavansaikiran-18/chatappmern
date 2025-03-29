import axios from  "axios"
const axiosinst=axios.create({
    baseURL:"http://localhost:8080/api",
    withCredentials:true,
})
export default axiosinst