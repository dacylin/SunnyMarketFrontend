<script setup>

import Header from "@/components/Header.vue";
import TopButton from "./components/TopButton.vue";
import Footer from "./components/Footer.vue";
import Home from "./views/Home/Home.vue";
import { useUserStore } from "@/stores/user";

import SideBar from "@/components/SideBar.vue";
import ProductDetail from "./views/ProductDetail.vue";

const userStore = useUserStore();
</script>

<template>
  <!-- header欄位 -->
  <Header />
  <main>
  <Home />
  </main>
  <TopButton />
  <Footer />
  <div id="app">
    <h1>這裡倒入productdetail</h1>
    <router-view></router-view>  <!-- 顯示路由對應的組件 -->
  </div>
</template>
<script>
import { defineComponent } from "vue";
</script>
<style scoped>
main {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 0;
}

.user {
  margin-top: 24px;
}
</style>

