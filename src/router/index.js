// todo：加上1226 入和購物車路徑、麵包屑組件

import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home/Home.vue';
import AboutUs from '@/views/AboutUs.vue';
import ProductDetail from '@/views/ProductDetail.vue';
import ProductPage from '@/views/ProductPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 定義路由歷史模式
  routes: [  // 定義路由配置
    {
      path: '/',
      name: 'Home',
      component: Home  // 首頁路由
    },
    {
      path: '/aboutus',
      name: 'AboutUs',
      component: AboutUs // 關於我們
    },
    {
      path: '/products',
      name: 'ProductPage',
      component: ProductPage  // 商品列表
    },
    {
      path: '/products/:productId',
      name: 'ProductDetail',
      component: ProductDetail  // 商品詳情頁面路由
    }
  ]
});

export default router;
