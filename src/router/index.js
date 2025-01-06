import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home/Home.vue";
// import AboutUs from '@/views/AboutUs.vue';
import ProductDetail from "@/views/ProductDetail.vue";
import ProductPage from "@/views/ProductPage.vue";
import AIService from "@/views/AIService.vue";
import Login from "@/views/Login.vue";
import Layout from "@/views/Layout.vue";
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
    {
      path: "/user/Layout",
      name: "Layout",
      component: Layout,
    },
    // 添加會員中心路由
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
    },
  ],
});

export default router;
