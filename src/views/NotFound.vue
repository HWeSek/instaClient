<template>
    <VaLayout>
    <template #left><NavBar></NavBar></template>
   
    <template #content>
        <div class="container">
            <VaAlert color="danger" style="padding: 30px">
                404: Route not found!
            </VaAlert>

            <img width="400" class="mt-5" style="margin: auto; box-shadow: 10px 10px 20px black;" :src="Sob">
        </div>
    </template>

    </VaLayout>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import Sob from "@/assets/cry.svg";
</script>

<style scoped>
.container {
    display: flex;
    padding: 70px;
    font-size: 5em;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}
</style>