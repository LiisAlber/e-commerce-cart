<template>
  <div class="two-column-layout">
    <!-- Left column for shopping cart -->
    <div class="left-column">
      <h1>Shopping Cart</h1>

      <div v-if="cartItems.length === 0">
        Your cart is empty.
      </div>

      <div v-if="cartItems.length > 0" class="cart-items-container">
        <CartItem
          v-for="item in cartItems"
          :key="item.id"
          :item="item"
          @increment="incrementQuantity(item)"
          @decrement="decrementQuantity(item)"
          @remove="removeFromCart(item)"
        />
      </div>

      <div v-if="cartItems.length > 0" class="cart-footer">
        <p>Total: €{{ cartTotal.toFixed(2) }}</p>
        <button @click="emptyCart">Empty Cart</button>
        <button @click="initiateCheckout">Proceed to Checkout</button>
      </div>
    </div>

    <!-- Right column for other content -->
    <div class="right-column" v-if="cartItems.length > 0 && proceedToCheckout">
  <OrderSummary :cartItems="cartItems" :discount="discount" :total="cartTotal" />
  <PaymentOptions />
  <ShippingOptions />
  <PromoCode @discountApplied="applyDiscount" />
</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'; 
import { useCartStore } from '../stores/cartStore';
import { CartItemType } from "@/types";
import CartItem from '@/components/Cart/CartItem.vue';
import OrderSummary from '@/components/Cart/OrderSummary.vue'; 
import PaymentOptions from '@/components/Cart/PaymentOptions.vue'; 
import ShippingOptions from '@/components/Cart/ShippingOptions.vue';
import PromoCode from '@/components/Cart/PromoCode.vue';

const cartStore = useCartStore();

const cartItems = computed(() => cartStore.cartItems);

let discount = ref(0);  // default discount is 0
let proceedToCheckout = ref(false);  // default is false, indicating checkout hasn't begun


const cartTotal = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
});

const applyDiscount = (discountValue: number) => {
  discount.value = discountValue;
};

const incrementQuantity = (item: CartItemType) => {
  cartStore.updateQuantity({ productId: item.id, quantity: item.quantity + 1 });
}

const decrementQuantity = (item: CartItemType) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity({ productId: item.id, quantity: item.quantity - 1 });
  }
}

const removeFromCart = (item: CartItemType) => {
  cartStore.removeFromCart(item.id);
}

const emptyCart = () => {
  cartStore.emptyCart();
}

const initiateCheckout = () => {
  proceedToCheckout.value = true;
}

</script>


<style scoped>
.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two equal columns */
  gap: 20px;  
  max-width: 1200px; /* Adjust as per your needs */
  margin: 0 auto; /* Centers the container */
}


.left-column {
  padding: 20px;
  background-color: #F7F9FC;
  max-width: 600px;
}

.cart-items-container {
  display: grid;
  grid-template-columns: 1fr; /* Single column for cart items */
  gap: 1rem; 
}

.cart-footer {
  margin-top: 2rem;
  text-align: left;
}

/* Style the "Proceed to Checkout" button */
.cart-footer button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 10px; 
}

.cart-footer button:last-child {
  margin-right: 0;  
}

.cart-footer button:hover {
  background-color: #0056b3;
}

/* Style the cart item container */
.cart-item {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  text-align: center; /* Center text */
}


.cart-item h3 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px; 
  text-align: center; 
}


.cart-item img {
  max-width: 100px;
  height: auto;
}

.right-column {
    padding: 20px; /* Gives some space inside the right column */
    background-color: #F7F9FC; /* Sample light blue background for distinction */
}

/* To add spacing between each component in the right column */
.right-column > div {
    margin-bottom: 20px;
}
</style>