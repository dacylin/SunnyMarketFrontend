import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home/Home.vue";
// import AboutUs from '@/views/AboutUs.vue';
import ProductDetail from "@/views/ProductDetail.vue";
import ProductPage from "@/views/ProductPage.vue";
import AIService from "@/views/AIService.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
// 導入 會員中心 組件
import UserCenter from "@/views/User/UserCenter.vue";
import OrderDetails from "@/components/userCenter/OrderDetails.vue";
import LoginHistory from "@/components/userCenter/LoginHistory.vue";
import UserProfile from "@/components/userCenter/UserProfile.vue";
// 導入 後台 組件
import AdminBackend from "@/views/Admin/AdminBackend.vue";
import UserTableList from "@/components/adminSystem/UserTableList.vue";
import ProductTableList from "@/components/adminSystem/ProductTableList.vue";
import OrdertableList from "@/components/adminSystem/OrdertableList.vue";
// 導入 購物車組件 (記得修改)
import Cart from "@/views/Cart/Cart.vue";
// 導入 TokenStore，限制User和Admin的可見路由
import TokenStore from "@/utils/TokenStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 定義路由歷史模式
  routes: [
    // 定義路由配置
    {
      path: "/",
      name: "Home",
      component: Home, // 首頁路由
    },
    {
      path: "/products",
      name: "ProductPage",
      component: ProductPage, // 商品列表
    },
    {
      path: "/products/:productId",
      name: "ProductDetail",
      component: ProductDetail, // 商品詳情頁面路由
    },
    {
      path: "/AIService",
      name: "AIService",
      component: AIService, // AIService 頁面路由
    },

    //登入、註冊 路由
    {
      path: "/user/Login",
      name: "Login",
      component: Login,
    },
    {
      path: "/user/Register",
      name: "Register",
      component: Register,
    },
    //購物車路由
    {
      path: "/Cart",
      name: "Cart",
      component: Cart,
    },

    // 會員中心路由
    {
      path: "/usercenter",
      name: "UserCenter",
      component: UserCenter,
      children: [
        {
          path: "orderdetails",
          name: "OrderDetails",
          component: OrderDetails,
        },
        {
          path: "loginhistory",
          name: "LoginHistory",
          component: LoginHistory,
        },
        {
          path: "userprofile",
          name: "UserProfile",
          component: UserProfile,
        },
      ],
      meta: { requiresAuth: true, role: "ROLE_USER" },
    },
    // 添加管理員後台路由
    {
      path: "/adminbackend",
      name: "adminbackend",
      component: AdminBackend,
      children: [
        {
          path: "usertablelist",
          name: "UserTableList",
          component: UserTableList,
        },
        {
          path: "producttablelist",
          name: "ProductTableList",
          component: ProductTableList,
        },
        {
          path: "ordertablelist",
          name: "OrdertableList",
          component: OrdertableList,
        },
      ],
      meta: { requiresAuth: true, role: "ROLE_ADMIN" },
    },
  ],
});

// 全局路由守衛
router.beforeEach((to, from, next) => {
  const token = TokenStore.getToken();
  const role = localStorage.getItem("role");
  console.log("Index.js 現在的role是", role);
  console.log("Index.js 現在的token是", token);

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

  // 檢查路由是否需要驗證
  if (to.meta.requiresAuth) {
    // 驗證是否登入
    if (!token || !isTokenValid(token)) {
      alert("您尚未登入，請先登入！");
      return next({ name: "Login" }); // 導向登入頁
    }

    // 驗證角色權限
    if (to.meta.role && to.meta.role !== role) {
      alert("您無權訪問此頁面！");
      return next({ name: "Home" }); // 導向首頁
    }
  }

  next(); // 繼續導航
});

export default router;
