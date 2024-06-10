<script setup lang="ts">
import { useAllData } from "@/stores/data";
import NavBar from "@/components/NavBar.vue";
import PostComponent from "@/components/PostComponent.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import apiUtils from "@/api/apiUtils";

const store = useAllData();

const route = useRoute()

const id = route.params.id;

const post = await apiUtils.get(`http://127.0.0.1:3000/api/photos/${id}`);


</script>

<template>
    <VaLayout>
    <template #left><NavBar></NavBar></template>
   
    <div class="container">
        <div v-if="!post" style="margin-top: 300px" ><h1 class="va-h1" style="size: 4rem">Nie ma takiego posta!</h1></div>
        <Suspense><PostComponent :data="post" size="1000px" class="mb-3"></PostComponent></Suspense>
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
</style>
