import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import ProductList from '@/views/ProductList.vue';
import Cart from '@/views/Cart.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/productlist',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },

  
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

  routes
});

export default router;
