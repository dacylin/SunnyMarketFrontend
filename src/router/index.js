import { createRouter, createWebHistory } from 'vue-router';
import ProductPage from '@/views/ProductPage.vue';

const routes = [
  { path: '/products', component: ProductPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
