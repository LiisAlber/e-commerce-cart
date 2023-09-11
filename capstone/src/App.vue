
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
      <div v-if="isCartOpen" class="cart-overlay">
        
      </div>
    </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { useCart } from './composables/useCart';

const { isCartOpen } = useCart();
</script>

<style>
  
  #app {
    font-family: 'Roboto', sans-serif;
    text-align: center;
    color: #2c3e50;
  }
  
  header, footer {
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
  background-color: rgba(0, 0, 0, 0.7); /* semi-transparent black background */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; 
}
</style>
