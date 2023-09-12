<template>
  <nav>
    <div class="brand">
      <router-link to="/"><h1>MyShop</h1></router-link>
    </div>

    <!-- Desktop navigation links -->
    <ul v-if="!showBurgerMenu" class="nav-links">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/productlist">Products</router-link></li>
      <li>
        <router-link to="/cart">
          <i class="fas fa-shopping-cart"></i> Cart
        </router-link>
      </li>
    </ul>

    <!-- Mobile burger icon -->
    <div v-else @click="toggleMenu" class="burger">
      ☰
    </div>

    <!-- Mobile navigation links -->
    <ul v-if="menuOpen" class="mobile-nav-links">
      <li @click="toggleMenu"><router-link to="/">Home</router-link></li>
      <li @click="toggleMenu"><router-link to="/productlist">Products</router-link></li>
      <li @click="toggleCart">
        <router-link to="/cart">
          <i class="fas fa-shopping-cart"></i> Cart
        </router-link>
      </li>
    </ul>
  </nav>
</template>


<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useCartStore } from '../stores/cartStore'; 

const cartStore = useCartStore(); // Initialize the cart store
const menuOpen = ref(false);
const showBurgerMenu = ref(window.innerWidth <= 768);

// Use properties and methods from the cart store
const isCartOpen = cartStore.isCartOpen;
const showCart = cartStore.showCart;
const hideCart = cartStore.hideCart;

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const toggleCart = () => {
  if (isCartOpen) { 
    hideCart();
  } else {
    showCart();
  }
};


const checkWindowSize = () => {
  showBurgerMenu.value = window.innerWidth <= 768;
};

onMounted(() => {
  window.addEventListener('resize', checkWindowSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkWindowSize);
});
</script>


<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    background-color: #F1F5F9; 
    color: #333740;
    margin: auto;
}

.brand {
    font-weight: bold;
    font-size: 1.5rem;
    color: #ED8936; 
}

.nav-links, .mobile-nav-links {
    list-style-type: none;
    display: flex;
    gap: 1rem;
    transition: all 0.3s ease; 
}

.nav-links li, .mobile-nav-links li {
    cursor: pointer;
    padding: 0.5rem; 
}

.nav-links li:hover, .mobile-nav-links li:hover {
    background-color: #EDF2F7; 
    border-radius: 4px;
    color: #4C58C2; 
}

.burger {
    display: none;
    cursor: pointer;
    font-size: 1.5rem;
}

@media (max-width: 768px) {
    .nav-links {
        display: none;
    }
    .burger {
        display: block;
    }
    .mobile-nav-links {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 60px;
        right: 1rem;
        background: #F7F9FC;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1); 
        z-index: 1000; 
    }
}

nav a {
    text-decoration: none;
    color: #4A4A4A;  
}

/* Improved hover effects */
.nav-links li:hover, .mobile-nav-links li:hover {
    background-color: #EDF2F7;
    border-radius: 4px;
}

nav a:hover {
    color: #4C58C2;
}

.brand h1 {
    margin: 0;
    color: #ED8936; 
}

.brand a:hover {
    text-decoration: none; 
    color: #4C58C2; 
}

</style>