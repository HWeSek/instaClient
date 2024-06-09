import { defineStore } from 'pinia'
import { ref } from 'vue';
import router from '@/router';
import apiUtils from '@/api/apiUtils'

export const useAllData = defineStore('data', () => {

    const posts = ref<any>([]);
    const token = ref<string | undefined>(undefined);

    async function getPosts() {
        try {
            const res = await apiUtils.get("http://127.0.0.1:3000/api/photos");
            if (Array.isArray(res)) {
                posts.value = res.reverse();
            }


        } catch (error) {
        }
    }



    return { posts, token, getPosts }
})