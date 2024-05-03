<template>
    <form @sumit.prevent="submit_function">
  
      <div style="background-color: rgb(64, 64, 245);" class = "w-[100%] h-[100vh]  flex items-center justify-center">
      <div class="w-[400px] p-5  rounded-[20px] bg-white"> 
      <h2 class="text-center font-bold text-[20px]"> Login </h2>
        <div class="items-center mt-[40px]  flex gap-[20px]">
          <label class="font-bold" id="">Login</label>
          <n-input v-model:value="login" type="text" placeholder="Login" />
     
        </div>
  
  
        <div class="mt-[40px] items-center flex gap-[20px]">
          <label class="font-bold" id="">Parol</label>
          <n-input v-model:value="parol"   type="password"  show-password-on="mousedown" placeholder="Parol" />
     
        </div>
  
        <router-link to="/sign" class="text-right flex justify-end text-blue-800 mt-[10px] cursor-pointer">
          Ro'yxatdan o'tish
        </router-link>
        <n-button @click = "submit_function" :disabled="(login.length > 3 && parol.length > 3)?false:true" type="success"  class="w-[80%] flex justify-center mx-auto block text-center mt-[40px]">Kirish</n-button>
      </div>
    </div>
    </form>
  </template>
  
  <script setup>
  import {ref} from "vue";
  import {useRouter} from "vue-router";
  import url from "./url";
  import { useMessage } from 'naive-ui';
  const message = useMessage()

  let router = useRouter()
  let login = ref("")
  let parol = ref("")
  const submit_function = async ()=>{
    console.log(login.value, parol.value);
    let backend = await fetch(`${url}login`,{
      method:"POST",
     body:JSON.stringify({
  login:login.value,
  password:parol.value
}),
headers:{
        "Content-type" : "application/json; charset=UTF-8"
      }})
if(backend.status == 401)return message.error("Parol yoki login xato")
else
if(backend.status == 200)
backend = await backend.json();
console.log(1, backend)
localStorage.setItem("token", backend.token);
message.success("Tizimga kirdingiz")
router.push("/dashtboard")
  }
  </script>
  
  <style scoped>
  
  </style>