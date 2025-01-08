<template>
  <header id="home">
    <router-link to="/" class="logo">
      <img src="@/assets/sunnymarket_nobg.png" alt="Logo" />
    </router-link>
    <ul class="nav">
      <!-- 帶出nav.js的資料 -->
      <li v-for="nav in navs" :key="nav.id">
        <router-link :to="{ name: nav.link }" class="navitem">{{
          nav.name
        }}</router-link>
      </li>
    </ul>
    <!-- 切換「登入」和「登出、會員中心」按鈕 -->
    <div v-if="!isLoggedIn">
      <router-link to="/user/login">
        <button class = "btn">登入</button>
      </router-link>
    </div>
    <div v-else>
      <button class = "btn" @click.native="logout">
        <p>登出</p>
      </button>
      <router-link to="/usercenter">
        <button class = "btn">會員中心</button>
      </router-link>
    </div>
    <div class="features">
      <CartBtn />
      <span class="count">購物車數量 {{ totalQuantity }}</span>
      <router-link to = "/cart"><p> 購物車</p></router-link>

      <span></span>
   
    </div>
  </header>
</template>

<script setup>
import navData from "@/nav/nav.js"; //默認導入 navData
import CartBtn from "@/components/CartBtn.vue"; //導入 購物車按鈕組件
import { ref, computed } from "vue";
import TokenStore from "@/utils/TokenStore";
import { useRouter } from "vue-router";
//抓購物車數量
import { useCartStore } from '@/stores/cartStore'; //載入pinia
import { storeToRefs } from 'pinia' // 可以使用方法

const navs = ref(navData);
const router = useRouter();

// 判斷 token 是否有效
const isTokenValid = (token) => {
  try {
    const payload = TokenStore.decodeToken(token); // 使用 TokenStore 內的解碼函數
    if (payload && payload.exp * 1000 > Date.now()) {
      return true; // Token 有效且未過期
    }
  } catch (error) {
    console.error("Token 無效:", error);
  }
  return false;
};

// 檢查是否登入
const isLoggedIn = computed(() => {
  const token = TokenStore.getToken();
  console.log("isLoggedIn的Token值:", token);
  return token && isTokenValid(token);
});

// 登出功能：移除 token 並更新狀態
const logout = async () => {
  // 移除 Token
  TokenStore.removeToken();

  // 確認 Token 是否為 null
  const token = TokenStore.getToken();
  if (token === null) {
    console.log("Token 已被移除");
  }

  console.log("登出後的 Token 值:", token);

  // 顯示提示訊息
  alert("您已成功登出！");

  // 使用 router 導航並強制刷新
  await router.push("/"); // 確保導航完成
  window.location.reload(); // 強制刷新頁面
};

//顯示購物車商品總數量
  // 初始化 Pinia 的 store
  const cartStore = useCartStore();

  // 使用 storeToRefs 解構 state 和 getters
  const {items, totalPrice, totalQuantity} = storeToRefs(cartStore)

</script>


<style scoped>
header {
  margin-top: 24px;
  width: 100%;
  padding: 10px;
  height: 100px;
  margin: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 5px rgba(150, 150, 150, 0.3);
  border-bottom: 2px solid rgba(150, 150, 150, 0.3);
}

.logo {
  width: 180px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo img {
  width: 100%;
}

.nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.nav li {
  list-style: none;
  margin: 0 30px;
  font-size: 1em;
}

.navitem {
  color: grey;
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 5px;
  cursor: pointer;
  font-size: 1em;
}

li {
  position: relative;
}

li::after {
  content: "";
  background-color: #ff8000;
  position: absolute;
  bottom: -20px;
  height: 3px;
  width: 100%;
  left: 0;
  right: 0;
  transition: all cubic-bezier(0, 0.95, 0.55, 0.95) 1s;
  opacity: 0;
}

li:hover::after {
  bottom: -7px;
  opacity: 0.75;
  transition: all cubic-bezier(0, 0.9, 0.6, 0.9) 1s;
}

/* 設置登入、登出/會員中心 路由樣式 */
.router-link {
  text-decoration: none; /* 移除底線 */
}

.logout-btn p,
.user-center-btn p {
  margin: 0; /* 移除文字的預設間距 */
}

.features {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
</style>
