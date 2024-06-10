<script setup lang="ts">
import apiUtils from '@/api/apiUtils';
import { useAllData } from '@/stores/data';
import { onBeforeMount, ref } from 'vue';
const store = useAllData();
const props = defineProps({
  data: { required: true },
  size: {type: String}
})
const userData = await apiUtils.get(`http://127.0.0.1:3000/api/profile/${props.data.album}`)
let width = '630px';
if(props.size){
  width = props.size;
}

</script>

<template>

  <div class="post" :style="'width: ' + width">
    <img :src="`http://127.0.0.1:3000/api/getimage/${props.data.id}`">
    <RouterLink :to="`/photo/${props.data.id}`"><VaIcon name="zoom_in" class="zoomin" size="80px"></VaIcon></RouterLink>
    <div class="infobox" style="">
      <RouterLink :to="`/user/${props.data.album}`" class="link">
      <VaAvatar :src="`http://127.0.0.1:3000/api/profile/picture/${props.data.album}`"></VaAvatar>
      <span style="font-weight: bold; font-size: 1.5rem; margin-left: 20px">{{ userData.name + " " + userData.lastName }}</span>
      </RouterLink>
      <VaDivider></VaDivider>
      <h2 style="font-weight: bold; color:rgb(34, 34, 34); ">Tags: </h2>
      <p class="tags"><span v-for="tag in props.data.tags">{{tag + " "}}</span></p>
    </div>
  </div>
   
</template>


<style scoped>
img {
  width: 100%;
  border: 1px inset rgb(49, 49, 49);
  border-bottom: none;
}

.infobox {
  background-color: rgba(220, 220, 220, 0.575);
  color: black;width: 100%; height: fit-content; min-height: 50px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top: none;
  padding: 15px;
}

.post {
  width: 630px;
  background-image: linear-gradient(to right, rgba(255, 13, 146, 0.7), rgba(185, 108, 236, 0.7));
  padding: 10px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  border: 4px outset var(--va-primary);
  box-shadow: -10px 10px 40px rgba(160, 106, 142, 0.644);
  position: relative;
}
    
.link:hover {
  color: rgb(39, 34, 31);
}

.link:active {
  color: black;
}

.link:visited {
  color: black;
}

.link.router-link-active {
  color: black;
}
.link.router-link-exact-active {
     color: black;
 }

 .tags {
  color:rgb(44, 44, 44);
  font-size: large;
 }

 .zoomin {
  color: rgba(201, 201, 201, 0.918);
  position: absolute;
  bottom: 140px;
  right: 20px;
  transition: 0.3s;
 }

 .zoomin:hover{
  color: rgba(204, 24, 24, 0.815);
 }

</style>