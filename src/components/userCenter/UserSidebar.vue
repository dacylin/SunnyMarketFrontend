<!-- html文字設定 -->
<template>
  <div class="sidebar">
    <div class="header_container">
      <router-link to="/">
        <img class="logo" src="@/assets/sunnymarket_nobg.png" alt="Logo" />
      </router-link>
      <div class="headertext">
        <span class="headertext2">會員中心</span>
      </div>
    </div>
    <div class="sidebarlist">
      <ul class="navlist">
        <li
          :class="{ active: activeIndex === 0 }"
          @click="setActive(0, orderdetails)"
        >
          訂單明細查詢
        </li>
        <li
          :class="{ active: activeIndex === 1 }"
          @click="setActive(1, loginhistory)"
        >
          登入歷史查詢
        </li>

        <li
          :class="{ active: activeIndex === 2 }"
          @click="setActive(2, userprofile)"
        >
          修改會員資料
        </li>
       
        <li class="logoutButton" @click="logout">登出</li>
      </ul>
    </div>
  </div>
</template>

<!-- js設定 -->
<script setup>
import { ref, onMounted, computed } from 'vue';
import TokenStore from "@/utils/TokenStore";
import { useRouter, useRoute } from "vue-router";

const activeIndex = ref(null);
const router = useRouter();
const route = useRoute();

const orderdetails = "/usercenter/orderdetails";
const userprofile = "/usercenter/userprofile";
const loginhistory = "/usercenter/loginhistory";


// 根據路由初始化 activeIndex
const setInitialActiveIndex = () => {
  const path = route.path;
  if (path.includes("/usercenter/orderdetails")) {
    activeIndex.value = 0;
  } else if (path.includes("/usercenter/userprofile")) {
    activeIndex.value = 1;
  } else if (path.includes("/usercenter/loginhistory")) {
    activeIndex.value = 2;
  }
};

// 設置選中的列表項
const setActive = (index, routePath) => {
  activeIndex.value = index;
  router.push(routePath);
};

// 從 localStorage 獲取角色
const role = computed(() => localStorage.getItem("role"));

// 初始化 activeIndex
onMounted(() => {
    setInitialActiveIndex();
});


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
  
};
</script>

<!-- css設定 -->
<style scoped>
.sidebar {
  width: 240px;
  height: 100vh;
  background: rgb(255, 255, 100);
  padding-top: 20px;
  margin-right: 20px;
  position: relative;
}

.header_container {
  margin: 20px;
}

.logo {
  width: 100%;
  margin-bottom: 20px;
}

.sidebarlist {
  margin-top: 40px;
}

.headertext {
  display: flex;
  gap: 20px;
  justify-content: center;
  color: slategray;
}
.headertext2 {
  font-size: 20px;
  font-weight: bold;
}

.navlist {
  list-style-type: none;
  padding: 0;
  margin-left: 20px;
}

.navlist li {
  color: slategray;
  margin-bottom: 24px;
  padding: 10px 0;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  transition: all 0.3s ease;
}

.navlist li:hover {
  color: orangered;
}

.navlist li.active {
  color: orangered;
  font-weight: bold;
}

/* 滑動底線效果 */
.navlist li.active::after {
  content: "";
  position: absolute;
  width: 80%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: orangered;
  transition: width 0.5s ease;
}

.navlist li::after {
  content: "";
  position: absolute;
  width: 0%;
  /* 初始狀態，底線為0 */
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: orangered;
  transition: width 0.5s ease;
}
</style>
