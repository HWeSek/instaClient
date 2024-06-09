<script setup lang="ts">
import Logo from "@/assets/Instagram_logo_2016.svg";
import { useAllData } from "@/stores/data";
import router from "@/router";
import { inject } from "vue";
import type { VueCookies } from "vue-cookies";

const store = useAllData();
const $cookies = inject<VueCookies>('$cookies');  

function logout(){
    if(store.token != undefined){
        store.token = undefined;
        router.push('/');
        $cookies?.remove('token');
    }
}

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
    <VaSidebarItem  to="/register" style="padding: 15px" v-if="store.token == undefined">
        <VaIcon name="app_registration" size="3rem" />
        <VaSidebarItemTitle class="va-title">Register</VaSidebarItemTitle>
    </VaSidebarItem>
    <VaSidebarItem  to="/" style="padding: 15px">
        <VaIcon name="home" size="3rem" />
        <VaSidebarItemTitle class="va-title">Home</VaSidebarItemTitle>
    </VaSidebarItem>
    <div style="height: 100%; width: 100%; margin-bottom: 30px" class="row align-end" v-if="store.token != undefined">
    <VaSidebarItem @click="logout" style="padding: 15px;">
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
        position: fixed
    }

    img {
        margin: 20px;
    }
    
</style>