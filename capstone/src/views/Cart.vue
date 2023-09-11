
<template>
    <div class="cart-container">
      <h1>Shopping Cart</h1>
      
      <div v-if="cartItems.length === 0">
        Your cart is empty.
      </div>
      
      <CartItem 
    v-for="item in cartItems" 
    :key="item.id" 
    :item="item"
    @increment="incrementQuantity"
    @decrement="decrementQuantity"
    @remove="removeFromCart"
/>


      <div v-if="cartItems.length > 0" class="cart-footer">
        <p>Total: €{{ total.toFixed(2) }}</p>
        <button @click="proceedToCheckout">Proceed to Checkout</button>
      </div>
    </div>
  </template>
  

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCart } from '../composables/useCart';
import CartItem from '@/components/CartItem.vue'

interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

const {
  cartItems,
  removeFromCart,
  updateQuantity,
} = useCart();

const total = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
});

const incrementQuantity = (item: CartItem) => {
  updateQuantity(item.id, item.quantity + 1);
}

const decrementQuantity = (item: CartItem) => {
  if (item.quantity > 1) {
    updateQuantity(item.id, item.quantity - 1);
  }
}

const router = useRouter();

const proceedToCheckout = () => {
  router.push('/checkout');  
}
</script>



<style scoped>
.cart-container {
  padding: 2rem;
  background-color: #F7F9FC;
}

.cart-items {
  list-style-type: none;
  padding: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #E1E4E8;
  border-radius: 4px;
}

.item-image {
  width: 100px;
  margin-right: 2rem;
}

.item-details {
  flex: 1;
}

.quantity-selector {
  display: flex;
  align-items: center;
}

.cart-summary {
  margin-top: 2rem;
  text-align: right;
}

</style>
