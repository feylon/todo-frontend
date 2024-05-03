import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui';
import login from "./components/login.vue";
import sign from "./components/sign.vue";
import head from "./components/head.vue"
import { createRouter, createMemoryHistory } from 'vue-router';

const routers = createRouter({
    history:createMemoryHistory(),
    routes:[
        {path:'/', component:login},
        {path:'/sign', component:sign},
        {path:'/dashtboard', component:head}


    ]
})

const app = createApp(App);
app.use(naive);
app.use(routers)
app.mount('#app')
