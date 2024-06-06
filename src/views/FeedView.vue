<script setup lang="ts">
import { useAllData } from "@/stores/data";
import NavBar from "@/components/NavBar.vue";

const store = useAllData();

</script>

<template>
  <main>
    <NavBar></NavBar>
    <template v-for="(post, i) in store.posts">
      <p>{{ post.id }}</p>
      <img width="200" :src="'http://127.0.0.1:3000/api/getimage/'+ post.id">
    </template>
  </main>
</template>

<style scoped>
p {
  border: 1px black solid;
}
</style>
