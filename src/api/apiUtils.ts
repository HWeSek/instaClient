import axios from "axios"

export default {
    get: async (url: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(url);
                resolve(response.data)
            } catch (error) {
                resolve(error.response)
            }
        })
    },
    post: async (url: string, data: any, contentType: string, token: string | undefined = undefined ) => {
        return new Promise(async (resolve, reject)=>{
            let headers;
            if(token == undefined){
                headers = {
                    "Content-Type": contentType
                } 
            }else{
                headers = {
                    "Authorization": "bearer "+ token,
                    "Content-Type": contentType
                } 
            }
            try {
                //console.log(url, data, contentType);
                
                const response = await axios.post(url, data,
                {
                    headers: headers
                })
                
                resolve(response)
            } catch (error) {                               
                resolve(error.response)
            }
        })
    },
}