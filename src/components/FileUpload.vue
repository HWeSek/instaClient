

<script setup lang="ts">
import { useAllData } from "@/stores/data";
import { ref } from "vue";
import apiUtils from "@/api/apiUtils";
import router from "@/router";

const emit = defineEmits(['alert'])

const store = useAllData();



const file = ref<Blob | null>(null);
const data = ref<any>(undefined);

let tags = ref([]);

let newTag = ref<String|undefined>(undefined);



let filterType = ref<String>('brak');
let rgbOption = ref(undefined);
let rotation = ref(0);


function addTag(){
  console.log(tags.value);
  
  if(newTag.value != undefined){
     if (!new RegExp('^#.+').test(newTag.value as string)) newTag.value = "#" + newTag.value;
      tags.value.push({name: newTag.value, active: true})
     
      newTag.value = undefined;

  }
}

async function uploadFile() {
    if(data){
      try {
        let fileData = new FormData();
        //@ts-ignore
        fileData.append("file", file.value as Blob, file!.value!.name)
        const res = await apiUtils.post('http://127.0.0.1:3000/api/photos', fileData, "multipart/form-data", store.token );

        let tagNames = {
          value: []
        }

        for(let tag of tags.value){
          if(tag.active == true){
            tagNames.value.push(tag.name);
          }
        }

        
        const resp = await apiUtils.patch(`http://127.0.0.1:3000/api/photos/tags/mass/${res.data.id}`, JSON.stringify(tagNames), "application/json", store.token);
        
        let filters = {
          id: res.data.id,
          filter: filterType.value,
          rgb: {r: 0, g: 0, b: 0},
          rotate: 0
        }

        if(filterType.value=='tint'){
          const color = rgbOption.value;
          const r = parseInt(color.substr(1,2), 16)
          const g = parseInt(color.substr(3,2), 16)
          const b = parseInt(color.substr(5,2), 16)
          filters.rgb.r = r
          filters.rgb.g = g
          filters.rgb.b = b
        }
        if(filterType.value == 'rotate'){
          filters.rotate = rotation.value;
        }

        const resp2 = await apiUtils.patch(`http://127.0.0.1:3000/api/filters`, JSON.stringify(filters), "application/json", store.token);
        
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

<template>
      <input v-on:change="handleFileUpload($event)"  type="file" accept="image/*">
      <img v-if="data" :src="data">
      <VaButton v-if="data" @click="uploadFile">Wyślij!</VaButton>
      <br>
      <VaDivider></VaDivider>
      <p>

        <template v-for="tag in tags">
              <VaChip closeable v-model="tag.active" >{{tag.name}}</VaChip>
        </template>

      </p>
      <VaInput class="mt-1" v-model="newTag" type="text" label="Add tag:" style="--va-input-font-weight: 700"></VaInput><VaButton @click="addTag" class="mt-2" style="width: 100px;">Dodaj tag </VaButton>
      <VaDivider></VaDivider>
      <h3>Filtry:</h3>
      <VaRadio v-model="filterType" :options="['brak','negate','grayscale','tint', 'rotate']"></VaRadio>
      <br>
      <VaColorInput v-if="filterType == 'tint'" v-model="rgbOption" class="w-8" />
        <VaSlider
          v-if="filterType == 'rotate'"
          v-model="rotation"
          track-label-visible
          :min="0"
          :max="359"/>

</template>

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
