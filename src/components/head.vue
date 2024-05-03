<template>
  <div class="w-full">
<nav class="w-[100%] flex justify-between  text-white bg-green-700 h-[50px] flex items-center p-[10px]">
<span class="text-[20px] font-bold">TO Do</span>
<n-button @click="Chiqish"  type="error" class="">Chiqish</n-button>

</nav>
<div>
  
  <div class="w-[50%] mx-auto mt-[40px] gap-[10px] flex"> 
<n-input v-model:value="atr"   type="text" show-password-on="mousedown" placeholder="Salom" />
<n-button @click="add" type="success">
  <i class="fas fa-plus"></i>
</n-button>

</div>

<div v-if='data.length > 0' v-for="i in data" :class="i.active?'bg-green-700 text-white':''" :key="i._id" class="mt-[35px] flex pe-0 items-center justify-between w-[50%] mx-auto mb-[35px] p-[25px] rounded-md  m-3  shadow-lg"> 
  <span>
  {{i.content}}

</span>
<div class="flex gap-[20px]">
  <div   @click="change(i._id)" class="bg-blue-500  w-[70px] h-[50px] text-white cursor-pointer rounded-lg flex items-center justify-center"><i class="fas fa-check"></i></div>

<div @click="delete1(i._id)"  class="bg-red-500  w-[70px] h-[50px] text-white cursor-pointer rounded-lg flex items-center justify-center"><i class="far fa-trash-can"></i> </div>

</div></div>
<div  v-else>
  <span  class="mx-auto block mt-3 font-bold text-center text-[17px] text-gray-400">Hozircha ma'lumotlar mavjud emas</span>
</div>
</div>
</div>
</template>

<script setup>
import {ref, h, onMounted} from "vue";
import { RouterLink } from "vue-router";
import url from "./url";
import { useDialog } from 'naive-ui';
import {useRouter} from "vue-router";
  import { useMessage } from 'naive-ui';
  const message = useMessage()
let router = useRouter()
let dialog = useDialog();
function Chiqish() {
        dialog.warning({
          title: "Chiqish",
          content: "Tizimdan chiqasizmi",
          positiveText: "Chiqish",
          negativeText: "Qolish",
          onPositiveClick: () => {
            router.push("/")
            message.success("Tizimdan chiqdingiz");
            return;
          },
          onNegativeClick: () => {
            message.success("Siz tizimda qoldingiz");
          }
        });
      }
let atr = ref ("1");
 let data = ref([])
let collapsed = ref(true);
onMounted(async()=>{
 get()
});
async function get (){
  let backend = await fetch(`${url}todo/get`);
 backend = await backend.json();
 data.value = backend;
 console.log(backend);
 atr.value = ""
}
let add = async ()=>{
  if(atr.value.trim() == "" )return
let backend = await fetch(`${url}todo/add`,{
      method:"POST",
     body:JSON.stringify({
      active:false,
  content:atr.value
}),
headers:{
        "Content-type" : "application/json; charset=UTF-8"
      }})
  get();
}
async function change (id){
  await fetch(`${url}todo/edit/${id}`,{
    method:'POST'
  });
get();
}


async function delete1 (id){
  await fetch(`${url}todo/delete/${id}`,{
    method:'DELETE'
  });
get();
}
</script>

<style  scoped>

</style>