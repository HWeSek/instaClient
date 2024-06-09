<template>
      <input v-on:change="handleFileUpload($event)"  type="file" accept="image/*">
      <img v-if="data" :src="data">
      <VaButton v-if="data" @click="uploadFile">Wyślij!</VaButton>
</template>

<script setup lang="ts">
import { useAllData } from "@/stores/data";
import { ref } from "vue";
import apiUtils from "@/api/apiUtils";
import router from "@/router";

const emit = defineEmits(['alert'])

const store = useAllData();



const file = ref<Blob | null>(null);
const data = ref<any>(undefined);

async function uploadFile() {
    if(data){
      try {
        let fileData = new FormData();
        //@ts-ignore
        fileData.append("file", file.value as Blob, file!.value!.name)
        const res = await apiUtils.post('http://127.0.0.1:3000/api/photos', fileData, "multipart/form-data", store.token );
        store.getPosts();
        router.push('/');
        
      } catch (error) {
        //@ts-ignore
        console.log(error.response);        
      }
    }else{
      emit('alert');
    }
}

const handleFileUpload = async ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    if (target && target.files) {
        file.value = target.files[0];
        const reader = new FileReader();
                     
        reader.addEventListener(
          "load",
          () => {
            data.value = reader.result;     
          },
          false,
        );
        
        if (file.value) {
          reader.readAsDataURL(file.value);
        }
    }
}

</script>

<style scoped>
input::file-selector-button {
    padding: 15px;
    border-radius: 23px;
    border: 2px outset rgb(234, 0, 255);
background-image: linear-gradient(to right, rgb(212, 111, 167), rgb(208, 144, 252));
color: aliceblue;
font-weight: bold;
}

input::file-selector-button:hover {
background-image: linear-gradient(to right, rgb(153, 62, 111), rgb(86, 18, 131));

}

img {
    width: 500px;
    margin-top: 20px;
}
</style>
