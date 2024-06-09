<script setup lang="ts">
import { useAllData } from "@/stores/data";
import NavBar from "@/components/NavBar.vue";
import PostComponent from "@/components/PostComponent.vue";
import { onMounted } from "vue";

const store = useAllData();

</script>

<template>
    <VaLayout>
    <template #left><NavBar></NavBar></template>
   
    <div class="container">
        <div v-if="store.posts.length == 0" style="margin-top: 300px" ><h1 class="va-h1" style="size: 4rem">Nie ma jeszcze żadnych postów!</h1></div>
        <template v-for="(post, i) in store.posts">
          <Suspense><PostComponent :data="post" class="mb-3"></PostComponent></Suspense>
        </template>
    </div>
    <VaButton v-if="store.token!=undefined" to="/upload" gradient style="position: fixed; width: 80px; height: 80px; right: 150px; bottom: 50px; border-radius: 50%;;" color="info">
      <VaIcon name="add_circle" size="large"></VaIcon>
    </VaButton>
    </VaLayout>
</template>

<style scoped>

.container {
  margin-left: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
