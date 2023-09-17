<template>
  <div id="app">
    <header>
      <Navbar />
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <p>© 2023 MyShop App</p>
    </footer>
    <!-- Cart Overlay -->
    <div v-if="isCartOpen" class="cart-overlay"></div>
    <div v-if="isCartOpen" class="cart-overlay"></div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { useCartStore } from './stores/cartStore';

const cartStore = useCartStore();
const isCartOpen = cartStore.isCartOpen;
</script>

<style>
:root {
  --primary-color: #30a9de;
  --button-color: #ff6b6b;
  --item-link-color: #ff6b6b;
  --secondary-color: #f46a6a;
  --neutral-light: #f7f9fc;
  --neutral-dark: #333;
}

#app {
  font-family: Roboto, sans-serif;
  text-align: center;
  color: #2c3e50;
}

header,
footer {
  padding: 20px;
}

main {
  padding: 20px 0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0/ 0/ 0/ 70%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

a,
a:visited {
  color: var(--link-color);
}

a:hover {
  color: #ff5050;
  text-decoration: underline;
}
</style>
