<template>
  <header id="home">
    <router-link to="/" class="logo">
    <img src="@/assets/sunnymarket_nobg.png" alt="Logo" />
  </router-link>
    <ul class="nav">
      <!-- 帶出nav.js的資料 -->
      <li v-for="nav in navData" v-bind:key="nav.id">
        <router-link :to="{ name: nav.link }" class="navitem">{{ nav.name }}</router-link>
      </li>
    </ul>
    <div class="features">
      <UserBtn />
      <CartBtn />
    </div>
  </header>
</template>
<script setup>
import navData from "@/nav/nav.js"; //默認導入 navData
import CartBtn from "@/components/CartBtn.vue"; //導入 購物車按鈕組件
import UserBtn from "@/components/UserBtn.vue"; //導入 登入按鈕組件
import { ref } from "vue";

const navs = ref(navData);
</script>

<script setup>
</script>

<style scoped>
header {
  margin-top: 24px; /* 控制跟上方元素60px */
  width: 100%; /* 控制寬度跟著main設定 */
  padding: 10px;
  height: 100px;
  margin: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 5px rgba(150, 150, 150, 0.3); /* 下陰影 */
  border-bottom: 2px solid rgba(150, 150, 150, 0.3);
}

.logo {
  width: 180px; /* 或其他你需要的寬度 */
  height: auto; /* 保持圖片比例 */
  /*margin-left: 50px;  調整logo與ul之間的距離 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo img {
  width: 100%; /*跟著父容器比例*/
}

.nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap:30px;
}

.nav li {
  list-style: none; /* 去除圓點 */
  margin: 0 30px;
  font-size: 1em;
}

/*以下 設定浮出文字下底線 */
.navitem {
  color: grey;
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
  font-size: 1em;
}

li {
  position: relative; /* 設定 li 為相對定位 */
}

li::after {
  content: "";
  background-color: #ff8000; /*橘色*/
  position: absolute;
  bottom: -15px;
  height: 3px;
  width: 100%;
  left: 0;
  right: 0;
  transition: all cubic-bezier(0, 0.95, 0.55, 0.95) 1s;
  opacity: 0; /* 預設隱藏 */
}

li:hover::after {
  bottom: -5px;
  opacity: 0.75;
  transition: all cubic-bezier(0, 0.9, 0.6, 0.9) 1s;
}
/* 調整icon區 */
.features{
  background-color:lavender; 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /*margin-right: 70px;  調整跟右邊之間的距離 */
  gap:20px;

}
</style>
