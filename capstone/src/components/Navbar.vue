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
          <i class="fas fa-shopping-cart"></i>
          <span class="cart-count" v-if="cartItemCount > 0">{{
            cartItemCount
          }}</span>
        </router-link>
      </li>
      <li v-if="!user">
        <router-link to="/signin">
          <i class="fas fa-sign-in-alt"></i>
        </router-link>
      </li>
      <li v-if="!user">
        <router-link to="/signup">
          <i class="fas fa-user-plus"></i>
        </router-link>
      </li>
      <li v-if="user" @click="signOut">
        <i class="fas fa-sign-out-alt"></i>
      </li>
    </ul>

    <div class="quick-cart-view" v-if="isCartOpen">
      <!-- List items in the cart -->
      <div v-for="item in cartStore.cartItems" :key="item.id">
        {{ item.title }} - {{ item.quantity }}
      </div>
      <!-- Show total price -->
      <div>Total: €{{ cartTotal.toFixed(2) }}</div>
    </div>

    <!-- Mobile burger icon -->
    <div v-else @click="toggleMenu" class="burger">☰</div>

    <!-- Mobile navigation links -->
    <ul v-if="menuOpen" class="mobile-nav-links">
      <li @click="toggleMenu"><router-link to="/">Home</router-link></li>
      <li @click="toggleMenu">
        <router-link to="/productlist">Products</router-link>
      </li>
      <li @click="toggleCart">
        <router-link to="/cart">
          <i class="fas fa-shopping-cart"></i>
          <span class="cart-count" v-if="cartItemCount > 0">{{
            cartItemCount
          }}</span>
        </router-link>
      </li>
      <li v-if="!user" @click="toggleMenu">
        <router-link to="/signin">
          <i class="fas fa-sign-in-alt"></i>
        </router-link>
      </li>
      <li v-if="!user" @click="toggleMenu">
        <router-link to="/signup">
          <i class="fas fa-user-plus"></i>
        </router-link>
      </li>
      <li v-if="user" @click="signOutToggleMenu">
        <i class="fas fa-sign-out-alt"></i> Sign Out
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useCartStore } from '../stores/cartStore';
import { useUserStore } from '../stores/authStore';

const cartStore = useCartStore(); // Initialize the cart store
const menuOpen = ref(false);
const showBurgerMenu = ref(window.innerWidth <= 768);

// Use properties and methods from the cart store
const isCartOpen = cartStore.isCartOpen;
const showCart = cartStore.showCart;
const hideCart = cartStore.hideCart;

const userStore = useUserStore();
const user = computed(() => userStore.user);

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

const cartItemCount = computed(() => {
  return cartStore.cartItems.reduce((acc, item) => acc + item.quantity, 0);
});

const cartTotal = computed(() => {
  return cartStore.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
});

const signOut = () => {
  userStore.signOut();
};

const signOutToggleMenu = () => {
  signOut();
  toggleMenu();
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background-color: #f1f5f9;
  color: #333740;
  margin: auto;
}

.brand {
  font-weight: bold;
  font-size: 1.5rem;
  color: #ed8936;
}

.nav-links,
.mobile-nav-links {
  list-style-type: none;
  display: flex;
  gap: 1rem;
  transition: all 0.3s ease;
}

.nav-links li,
.mobile-nav-links li {
  cursor: pointer;
  padding: 0.5rem;
}

.nav-links li:hover,
.mobile-nav-links li:hover {
  background-color: #edf2f7;
  border-radius: 4px;
  color: #4c58c2;
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
    background: #f7f9fc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0/ 0/ 0/ 10%);
    z-index: 1000;
  }
}

nav a {
  text-decoration: none;
  color: #4a4a4a;
}

nav a:hover {
  color: #4c58c2;
}

.brand h1 {
  margin: 0;
  color: #ed8936;
}

.brand a:hover {
  text-decoration: none;
  color: #4c58c2;
}

.cart-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  position: relative;
  top: -10px;
  left: -10px;
}

.quick-cart-view {
  position: absolute;
  top: 60px; /* Adjust based on the height of your nav */
  right: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px; /* Or whatever width you prefer */
  box-shadow: 0 0 10px rgba(0/ 0/ 0/ 10%);
  z-index: 10; /* Ensure it's on top of other elements */
  padding: 1rem;
}
</style>
