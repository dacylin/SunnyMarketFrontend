import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home/Home.vue';
import AboutUs from '@/views/AboutUs.vue';
import ProductDetail from '@/views/ProductDetail.vue';

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
      path: '/product/:productId',
      name: 'ProductDetail',
      component: ProductDetail  // 商品詳情頁面路由
    }
  ]

});

export default router;
