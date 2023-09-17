import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import ProductList from '@/views/ProductList.vue';
import Cart from '@/views/Cart.vue';
import ProductDetail from '@/components/ProductDetail.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';

export const RouteNames = {
  Home: 'Home',
  ProductList: 'ProductList',
  ProductDetail: 'ProductDetail',
  Cart: 'Cart',
  SignIn: 'SignIn',
  SignUp: 'SignUp',
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/productlist',
    name: 'ProductList',
    component: ProductList,
  },

  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true,
  },

  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes,
});

export default router;
