<script setup lang="ts">
import Logo from "@/assets/Instagram_logo_2016.svg"
</script>

<template>
  <div class="sidebar">
    <img width="100" :src="Logo">
    <VaSidebarItem  to="/" style="p-5">
        <VaIcon name="home" size="4rem" />
    </VaSidebarItem>

  </div>
</template>


<style scoped>
    .sidebar {
        width: 180px;
        height: 100vh;
        background-color: var(--va-background-element);
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        padding: 0;
    }

    img {
        margin: 20px;
    }
</style>