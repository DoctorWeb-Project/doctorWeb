const axios = require("axios")

const api = axios.create({
    baseURL: "http://10.0.0.105:3333",
    headers: {
        'Content-Type': 'application/json',
    }
})

const token = localStorage.getItem('token')

api.interceptors.response.use(
    response => {
        return response
    },

    error => {
        if(error.message == 'Network Error'){
            
            //Navigate('Landing',{message:'connection error'})
            
        }

        if(error.response.status===401|| error.response.status===403){
            const requestConfig = error.config
            //Navigate('Login',{})
        
            return axios(requestConfig)
        }

        return Promise.reject(error)
    },
          

)

api.interceptors.request.use(
    config => {
        if(token)
            config.headers.authorization = `Bearer ${token}` 
        return Promise.resolve(config)
    },

    error => {
        return Promise.reject(error)
    }
)


export default api