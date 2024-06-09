import axios from "axios"

export default {
    get: async (url: string, token: string | undefined = undefined) => {
        return new Promise(async (resolve, reject) => {
            try {
                let headers;
                if (token != undefined) {
                    headers = {
                        Authorization: `Bearer ${token}`,
                    }
                }
                const response = await axios.get(url, { headers: headers });
                resolve(response.data)
            } catch (error) {

                //@ts-ignore
                resolve(error.response)
            }
        })
    },
    post: async (url: string, data: any, contentType: string, token: string | undefined = undefined) => {
        return new Promise(async (resolve, reject) => {
            let headers;
            if (token == undefined) {
                headers = {
                    "Content-Type": contentType
                }
            } else {
                headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": contentType
                }
            }
            try {
                console.log(url, data, headers);

                const response = await axios.post(url, data,
                    {
                        headers: headers
                    })

                resolve(response)
            } catch (error) {
                //@ts-ignore
                resolve(error.response)
            }
        })
    },
    patch: async (url: string, data: any, contentType: string, token: string | undefined = undefined) => {
        return new Promise(async (resolve, reject) => {
            let headers;
            if (token == undefined) {
                headers = {
                    "Content-Type": contentType
                }
            } else {
                headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": contentType
                }
            }
            try {
                console.log(url, data, headers);

                const response = await axios.patch(url, data,
                    {
                        headers: headers
                    })

                resolve(response)
            } catch (error) {
                //@ts-ignore
                resolve(error.response)
            }
        })
    },
}