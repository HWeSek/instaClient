<script setup lang="ts">
import { useAllData } from "@/stores/data";
import NavBar from "@/components/NavBar.vue";
import PostComponent from "@/components/PostComponent.vue";
import { onMounted, ref, watch } from "vue";
import apiUtils from "@/api/apiUtils";
import FileUpload from "@/components/FileUpload.vue";
import router from "@/router";
import { useRoute } from "vue-router";

const store = useAllData();
const route = useRoute()


let flag = ref(true);

const userData = await apiUtils.get(`http://127.0.0.1:3000/api/profile/${route.params.mail}`);
if(userData?.status == 400){
    flag.value = false;
}


const posts = store.filterPostsByUser(route.params.mail);


</script>

<template>
    <VaLayout>
    <template #left><NavBar></NavBar></template>
    
    <div class="container" v-if="flag">
        <div class="head">
            <div>
                <p style="font-size: 1.3rem; margin-top: 90px; background-color: aliceblue; padding: 15px; border-radius: 15px; border: 1px outset black; ">Posts: {{ posts.length }}</p>
            </div>
            <div>
             <div style="width: 160px; height: 160px; border-radius: 50%; border: 2px outset black; background-size: cover;" :style="`background-image: url(http://127.0.0.1:3000/api/profile/picture/${route.params.mail})`"></div>
             <br><h1>{{userData!.name + " " + userData!.lastName}}</h1>
            </div>  
        </div>

        <div v-if="posts.length == 0" style="margin-top: 300px" ><h1 class="va-h1" style="size: 4rem">Nie ma jeszcze żadnych postów!</h1></div>
        <template v-for="(post, i) in posts">
          <Suspense><PostComponent :data="post" class="mb-3"></PostComponent></Suspense>
        </template>
    </div>
    <div v-if="!flag" class="container">
        <h1 class="va-h1" style="size: 4rem; color: white">Nie znaleziono użytkownika</h1>
    </div> 
    </VaLayout>
</template>

<style scoped>

.container {
  margin-left: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.head {
    background-color: var(--va-background-secondary);
    width: 100%;
    min-height: 230px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    color: rgb(22, 22, 22);
    border-bottom: 3px rgb(102, 13, 102) outset;
}

.head div {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10px;
    text-align: center
}

h1 {
    color: rgb(22, 22, 22);
    font-size: 2rem;
    font-weight: bold;
}

.settings {
    margin-top: 50px; 
}

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

.preview {
    width: 500px;
    margin-top: 20px;
}

</style>
