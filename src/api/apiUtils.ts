import axios from "axios"

export default {
    get: async (url: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(url);
                resolve(response.data)
            } catch (err) {
                reject(err)
            }
        })
    },
    post: () => {

    }
}