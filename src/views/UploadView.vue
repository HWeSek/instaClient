<script setup lang="ts">
import { ref, onMounted } from "vue";
import NavBar from "@/components/NavBar.vue";
import FileUpload from "@/components/FileUpload.vue";
import router from "@/router";
import { useAllData } from "@/stores/data";


const store = useAllData();

onMounted(() => {
    if(!store.token){
        router.push('/');
    }
})


let files = ref([]);
let alert = ref<boolean>(false)


</script>

<template>
    <VaAlert
         color="danger"
         icon="warning"
         class="mb-6"
         v-model="alert"
         style="position: absolute; width: 500px; top: 10px; left: 33% ; z-index: 2;"
         closeable
         >
         Błąd wysyłania zdjęcia!
    </VaAlert>
    <VaLayout>
    <template #left><NavBar></NavBar></template>
   
    <div class="container">
        <div class="upload">
            <FileUpload @alert="alert = true"></FileUpload>
        </div>
    </div>
    </VaLayout>
</template>

<style scoped>

.container {
  margin-left: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload {
    width: 800px;
    background-color: rgb(29, 29, 29);
    border: 3px var(--va-primary) outset;
    margin-top: 100px;
    padding: 70px;
    box-shadow: -10px 10px 40px rgba(160, 106, 142, 0.644);
    border-radius: 30px;
    display: grid;
    justify-content: center;
}
</style>
