<script setup lang="ts">
import Logo from "@/assets/Instagram_logo_2016.svg";
import { useAllData } from "@/stores/data";
const store = useAllData();
</script>

<template>
  <div class="sidebar">
    <img width="80" :src="Logo">
    <VaSidebarItem  to="/profile" style="padding: 15px" v-if="store.token != undefined">
        <VaIcon name="person" size="3rem" />
        <VaSidebarItemTitle class="va-title">You</VaSidebarItemTitle>
    </VaSidebarItem>
    <VaSidebarItem  to="/login" style="padding: 15px" v-if="store.token == undefined">
        <VaIcon name="login" size="3rem" />
        <VaSidebarItemTitle class="va-title">Log in</VaSidebarItemTitle>
    </VaSidebarItem>
    <VaSidebarItem  to="/" style="padding: 15px">
        <VaIcon name="home" size="3rem" />
        <VaSidebarItemTitle class="va-title">Home</VaSidebarItemTitle>
    </VaSidebarItem>
    <div style="height: 100%; width: 100%; margin-bottom: 30px" class="row align-end" v-if="store.token != undefined">
    <VaSidebarItem style="padding: 15px;">
        <VaIcon name="logout" size="3rem" />
        <VaSidebarItemTitle class="va-title">Logout</VaSidebarItemTitle>
    </VaSidebarItem>
    </div>
  </div>
</template>


<style scoped>
    .sidebar {
        width: 150px;
        height: 100vh;
        background: var(--va-background-element);
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