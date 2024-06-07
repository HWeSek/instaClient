<template>
    <VaLayout>
    <template #left><NavBar></NavBar></template>
   
    <template #content>
        <div class="container">
            <h1 class="va-h1">Zaloguj się!</h1>
            <div>
            <VaCard style="width: 30%; margin: auto; text-align: start" color="secondary">
                <VaCardContent>
                    <VaForm>
                        <VaInput placeholder="Type your email adress!" label="E-mail" style="--va-input-font-weight: 700"></VaInput>
                    </VaForm>
                </VaCardContent>
            </VaCard>
            </div>

        </div>
    </template>

    </VaLayout>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
</script>

<style scoped>
.container {
    display: flex;
    padding: 70px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}

.va-input-label {
    font-weight: 700
}
</style>