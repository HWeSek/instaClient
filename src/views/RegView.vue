<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import { useAllData } from "@/stores/data";
import { ref } from "vue";
import apiUtils from "@/api/apiUtils";
 
const store = useAllData();
let login = ref<string>('');
let password = ref<string>('');

let name = ref<string>('');
let surname = ref<string>('');

let alert = ref<boolean>(false);
let confirm = ref<boolean>(false);

let link = ref<string>('')

async function registerCheck(){
    if(login.value != '' && password.value != '' && name.value != '' && surname.value != ''){    
        try {            
            const res = await apiUtils.post("http://127.0.0.1:3000/api/user/register", {    
             name: name.value,
             lastName: surname.value,
             email:login.value,
             password:password.value
            }, "application/json")
            //@ts-ignore
            if(res.data.status == 201){
                confirm.value = true;
                //@ts-ignore
                link.value = res.data.message;
            }

        } catch (error) {
            
        }  

    }else{
        alert.value = true;        
    }
}

</script>

<template>
      <VaAlert
         color="warning"
         icon="warning"
         class="mb-6"
         v-model="alert"
         style="position: absolute; width: 500px; top: 10px; left: 33% ; z-index: 2;"
         closeable
         >
         Błędne dane rejestracji!
      </VaAlert>

      <VaAlert
         color="success"
         icon="success"
         class="mb-6"
         v-model="confirm"
         style="position: fixed; top: 10px; left: 33% ; z-index: 2; text-align: start"
         closeable
         >
         Użytkownik zarejestrowany! Kliknij tutaj aby potwierdzić: <a :href="link">Potwierdź</a>
      </VaAlert>
    <VaLayout>
    <template #left><NavBar></NavBar></template>
   
    <template #content>
        <div class="container">
            <h1 class="va-h1"  style="margin-left: 34vw">Zarejestruj się!</h1>
            <div style="margin-left: 32vw">
            <VaCard style="width: 370px; text-align: start; margin-top: 120px" color="secondary">
                <VaCardContent>
                    <VaForm class="flex column">
                        <VaInput v-model="name" class="mb-3" placeholder="Enter your name" type="text" label="Name" style="--va-input-font-weight: 700"></VaInput>
                        <VaInput v-model="surname" class="mb-3" placeholder="Enter your last name" type="text" label="Last name" style="--va-input-font-weight: 700"></VaInput>
                        <VaInput v-model="login" class="mb-3" placeholder="Enter email adress" type="text" label="E-mail" style="--va-input-font-weight: 700"></VaInput>
                        <VaInput v-model="password" class="mb-3" placeholder="Enter password" type="password" label="Password" style="--va-input-font-weight: 700"></VaInput>
                        <VaButton gradient style="width: 120px" @click="registerCheck">Register!</VaButton>
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
    left: 17.7vw;
}

</style>