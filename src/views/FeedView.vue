<script setup lang="ts">
import { useAllData } from "@/stores/data";
import NavBar from "@/components/NavBar.vue";
import PostComponent from "@/components/PostComponent.vue";

const store = useAllData();

</script>

<template>
    <VaLayout>
    <template #left><NavBar></NavBar></template>
   
    <div class="container">
        <template v-for="(post, i) in store.posts">
        <PostComponent :data="post" class="mb-3"></PostComponent>
        </template>
    </div>
    <VaButton to="/upload" gradient style="position: fixed; width: 60px; height: 60px; right: 150px; bottom: 50px; border-radius: 50%;;" color="info">
      <VaIcon name="add_circle"></VaIcon>
    </VaButton>
    </VaLayout>
</template>

<style scoped>

.container {
  margin-left: 300px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
