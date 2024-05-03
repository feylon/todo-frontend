<template>
    <form @sumit.prevent="submit_function">
      <div style="background-color: rgb(64, 64, 245);" class = "w-[100%] h-[100vh]  flex items-center justify-center">
      <div class="w-[400px] p-5  rounded-[20px] bg-white"> 
      <h2 class="text-center font-bold text-[20px]"> Ro'yxatdan o'tish </h2>
        <div class="items-center mt-[40px]  flex gap-[20px]">
          <label class="font-bold" id="">Login</label>
          <n-input v-model:value="login" type="text" placeholder="Login" />
     
        </div>


        <div class="items-center mt-[40px]  flex gap-[20px]">
          <label class="font-bold" id="">Ismi</label>
          <n-input v-model:value="name" type="text" placeholder="Login" />
     
        </div>
  
        <div class="mt-[40px] items-center flex gap-[20px]">
          <label class="font-bold" id="">Parol</label>
          <n-input v-model:value="password"   type="password"  show-password-on="mousedown" placeholder="Parol" />
     
        </div>
  
        
        <router-link to="/" class="text-right flex justify-end text-blue-800 mt-[10px] cursor-pointer">
          Tizimga kirish
        </router-link>
        <n-button @click = "submit_function" :disabled="(login.length > 3 && password.length > 3 && name.length > 3)?false:true" type="success"  class="w-[80%] flex justify-center mx-auto block text-center mt-[40px]">Ro'yxatdan o'tish</n-button>
      </div>
    </div>
    </form>
  </template>
  
  <script setup>
  import {useRouter} from "vue-router";
  import {ref} from "vue";
  import { useMessage } from 'naive-ui';
  
import url from "./url"
const message = useMessage()
  let router = useRouter()
  let login = ref("")
  let password = ref("")
  let name = ref("")

  const submit_function = async ()=>{
    console.log(login.value, password.value, name.value);
    let backend = await fetch(`${url}sign`,{
      method:"POST",
     body:JSON.stringify({
  name:name.value,
  login:login.value,
  password:password.value
}),
      headers:{
        "Content-type" : "application/json; cahrset=UTF-8"
      }
    });
    if(backend.status == 401 ) return message.error(`${login.value} allaqachon ro'yxatdan o'tish`)
    if(backend.status == 201) {
    message.success(`${login.value} ro'yxatdan o'tdi`);
      router.push("/")
    return;
    }

  }
  </script>
  
  <style scoped>
  
  </style>