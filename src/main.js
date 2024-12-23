import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router"; // 引入 Vue Router
import ProductDetail from "./views/ProductDetail.vue"; // 引入 ProductDetail 頁面

// 設定路由
const routes = [
    {
      path: '/product/:productId',  // 設定路由動態參數 :productId
      component: ProductDetail,     // 當路徑匹配時顯示這個組件
    },
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

// 創建 Vue 應用實例
const app = createApp(App);
// 使用 Pinia 和 Router
app.use(createPinia());
app.use(router); // 使用路由
app.mount("#app");
