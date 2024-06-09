<script setup lang="ts">
import { useAllData } from "@/stores/data";
import NavBar from "@/components/NavBar.vue";
import PostComponent from "@/components/PostComponent.vue";
import { onMounted, ref } from "vue";
import apiUtils from "@/api/apiUtils";
import FileUpload from "@/components/FileUpload.vue";
import router from "@/router";

const store = useAllData();
const userData = await apiUtils.get(`http://127.0.0.1:3000/api/profile`, store.token);

const posts = store.filterPostsByUser(userData!.email);

let pfpModal = ref<boolean>(false);
let otherModal = ref<boolean>(false);



const file = ref<Blob | null>(null);
const data = ref<any>(undefined);

let name=ref<String|null>(null);
let surname=ref<String|null>(null);

async function uploadFile() {
    if(data){
      try {
        let fileData = new FormData();
        //@ts-ignore
        fileData.append("file", file.value as Blob, file!.value!.name)
        const res = await apiUtils.post('http://127.0.0.1:3000/api/profile', fileData, "multipart/form-data", store.token );
        store.getPosts();
        router.push('/profile')
        pfpModal.value = false;
        window.location.reload();
        
      } catch (error) {
        //@ts-ignore
        console.log(error.response);        
      }
    }else{

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


async function changeName(){
    if(name&&surname){
        let data = {
            name: name.value,
            lastName: surname.value
        }
        const res = await apiUtils.patch('http://127.0.0.1:3000/api/profile', JSON.stringify(data), "application/json", store.token );
        router.push('/profile')
        window.location.reload();
    }else{

    }
}


</script>

<template>
    <VaLayout>
    <template #left><NavBar></NavBar></template>
    
    <div class="container">
        <div class="head">
            <div>
                <p style="font-size: 1.3rem; margin-top: 90px; background-color: aliceblue; padding: 15px; border-radius: 15px; border: 1px outset black; ">Posts: {{ posts.length }}</p>
            </div>
            <div>
             <div style="width: 160px; height: 160px; border-radius: 50%; border: 2px outset black; background-size: cover;" :style="`background-image: url(http://127.0.0.1:3000/api/profile/picture/${userData.email})`"></div>
             <br><h1>{{userData!.name + " " + userData!.lastName}}</h1>
            </div>  
            <div class="settings">
                <VaButton @click="pfpModal = !pfpModal">Upload profile picture</VaButton><br>
                <VaButton @click="otherModal = !otherModal">Edit profile</VaButton>
            </div>
        </div>

        <div v-if="posts.length == 0" style="margin-top: 300px" ><h1 class="va-h1" style="size: 4rem">Nie ma jeszcze żadnych postów!</h1></div>
        <template v-for="(post, i) in posts">
          <Suspense><PostComponent :data="post" class="mb-3"></PostComponent></Suspense>
        </template>
    </div>




    <VaButton v-if="store.token!=undefined" to="/upload" gradient style="position: fixed; width: 80px; height: 80px; right: 150px; bottom: 50px; border-radius: 50%;;" color="info">
      <VaIcon name="add_circle" size="large"></VaIcon>
    </VaButton>
    </VaLayout>

    <VaModal
        v-model="pfpModal"
        ok-text="Apply"  backgroundColor="backgroundElement" :hideDefaultActions="true" :closeButton="true"	>    
        <h3 class="va-h3">
            Zmień swoje zdjęcie profilowe
        </h3>
        <input v-on:change="handleFileUpload($event)"  type="file" accept="image/*">
        <img class="preview" v-if="data" :src="data"><br>
        <VaButton v-if="data" @click="uploadFile">Wyślij!</VaButton>

    </VaModal>

    <VaModal
        @ok="changeName"
        v-model="otherModal"
        ok-text="Apply"  backgroundColor="backgroundElement" :closeButton="true"	>    
        <h3 class="va-h3">
            Zmień dane użytkownika
        </h3>
        <VaInput v-model="name" class="mb-3" placeholder="Enter your name" type="text" label="Name" style="--va-input-font-weight: 700"></VaInput><br>
        <VaInput v-model="surname" class="mb-3" placeholder="Enter your last name" type="text" label="Last name" style="--va-input-font-weight: 700"></VaInput>

    </VaModal>
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
    height: 230px;
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
