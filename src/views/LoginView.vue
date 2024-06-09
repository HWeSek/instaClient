<script setup lang="ts">
import router from "@/router";
import NavBar from "@/components/NavBar.vue";
import { useAllData } from "@/stores/data";
import { ref, inject } from "vue";
import apiUtils from "@/api/apiUtils"; 
import type { VueCookies } from "vue-cookies";

const store = useAllData();
let login= ref<string>('');
let password = ref<string>('');
let alert = ref<boolean>(false);

const $cookies = inject<VueCookies>('$cookies');  

async function loginCheck(){
    if(login.value != '' && password.value != ''){       
        try {
            const res = await apiUtils.post("http://127.0.0.1:3000/api/user/login", {email: login.value, password: password.value}, "application/json");
           
    
            //@ts-ignore
            if(res.status == 200){
                //@ts-ignore
                store.token = res.data
                $cookies!.set('token', store.token, "1h")
                router.push('/');
            }else{
                alert.value = true;
            }
            
        } catch (error) {
           
        }
    }
    else{
        alert.value = true;        
    }
}

</script>

<template>
      <VaAlert
         color="warning"
         icon="warning"
         class="mb-6"
         v-model = "alert"
         style="position: fixed; width: 500px; top: 10px; left: 30% ; z-index: 2;"
         closeable
         >
         Błędne dane logowania!
      </VaAlert>
    <VaLayout>
    <template #left><NavBar></NavBar></template>
   
    <template #content>
        <div class="container">
            <h1 class="va-h1"  style="margin-left: 500px">Log in!</h1>
            <div style="margin-left: 395px">
            <VaCard style="width: 370px; text-align: start; margin-top: 120px" color="secondary">
                <VaCardContent>
                    <VaForm class="flex column">
                        <VaInput v-model="login" class="mb-3" placeholder="Enter your email adress" type="text" label="E-mail" style="--va-input-font-weight: 700"></VaInput>
                        <VaInput v-model="password" class="mb-3" placeholder="Enter your password" type="password" label="Password" style="--va-input-font-weight: 700"></VaInput>
                        <VaButton gradient style="width: 120px" @click="loginCheck">Log in!</VaButton>
                    </VaForm>
                </VaCardContent>
            </VaCard>
            </div>
            <img src="@/assets/torii.png">
        </div>
    </template>

    </VaLayout>
</template>



<style scoped>
.container {
    display: flex;
    padding: 70px;
    flex-direction: column;
    justify-content: center;
}

.va-input-label {
    font-weight: 700
}

img {
    position: absolute;
    z-index: -1;
    width: 900px;
    top: 10px;
    left: 200px;
}

</style>