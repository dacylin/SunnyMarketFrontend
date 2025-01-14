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
    <!-- USER_ADMIN：切換「登入」和「登出、後台管理」按鈕 
         ROLE_ADMIN：切換「登入」和「登出、會員中心」按鈕 
    -->
    <div class="btncontain" v-if="!isLoggedIn">
      <router-link to="/user/login">
        <button class="btn">登入 | 註冊</button>
      </router-link>
    </div>
    <div class="btncontain" v-else-if="isUser">
      <p class="welcome">歡迎 {{ email }}</p>
      <button class="btn" @click="logout">
        <p>登出</p>
      </button>
      <router-link to="/usercenter">
        <button class="btn">會員中心</button>
      </router-link>
    </div>
    <div class="btncontain" v-else-if="isAdmin">
      <button class="btn" @click="logout">
        <p>登出</p>
      </button>
      <router-link to="/adminbackend">
        <button class="btn">後台管理</button>
      </router-link>
    </div>
  </header>
</template>

<script setup>
import navData from "@/nav/nav.js"; //默認導入 navData
import { ref, computed } from "vue";
import TokenStore from "@/utils/TokenStore";
import { useRouter } from "vue-router";

const navs = ref(navData);
const router = useRouter();
const email = localStorage.getItem('email');

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

// 從 localStorage 獲取角色
const role = computed(() => localStorage.getItem("role"));

// 判斷是否為普通用戶
const isUser = computed(() => role.value === "ROLE_USER");

// 判斷是否為管理員
const isAdmin = computed(() => role.value === "ROLE_ADMIN");

// 登出功能：移除 token 並更新狀態
const logout = async () => {
  console.log("角色準備登出", role.value);
  // 移除 Token 跟 role
  TokenStore.removeToken();
  localStorage.removeItem("role");

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

/* 登入、登出、會員中心按鈕 */
.btncontain {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.btn {
  padding: 10px;
  border: none;
  background: white;
  border: 2px solid lightgray;
  color: darkgray;
  border-radius: 5px;
  font-size: 1em;
  margin: 0 10px;
  font-weight: bold;
}

.btn:hover {
  background: lightgoldenrodyellow;
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
  color: darkgray;
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
  text-decoration: none;
  /* 移除底線 */
}

.logout-btn p,
.user-center-btn p {
  margin: 0;
  /* 移除文字的預設間距 */
}

.welcome {
  color: darkgray;
  font-weight: bold;
}
</style>
