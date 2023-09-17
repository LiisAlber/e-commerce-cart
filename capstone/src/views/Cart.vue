<template>
  <div class="two-column-layout">
    <!-- Left column for shopping cart -->
    <div class="left-column">
      <h1>Shopping Cart</h1>

      <div v-if="cartItems.length === 0">Your cart is empty.</div>

      <div v-if="cartItems.length > 0" class="cart-items-container">
        <CartItem
          v-for="item in cartItems"
          :key="item.id"
          :item="item"
          @increment="cartStore.incrementQuantity(item)"
          @decrement="cartStore.decrementQuantity(item)"
          @remove="removeFromCart(item)"
        />
      </div>

      <div v-if="cartItems.length > 0" class="cart-footer">
        <p>Total: €{{ cartTotal.toFixed(2) }}</p>
        <button @click="emptyCart">Empty Cart</button>
        <button @click="initiateCheckout">Proceed to Checkout</button>
      </div>
      <!-- Modal for authentication choice -->
      <div v-if="showAuthModal" class="auth-modal">
        <h2>Proceed to Checkout</h2>
        <p v-if="!userStore.isAuthenticated">
          You have the option to sign in or continue as a guest. How would you
          like to proceed?
        </p>
        <p v-else>You are already signed in. How would you like to proceed?</p>
        <button @click="redirectToLogin">Sign In</button>
        <button @click="continueAsGuest">Continue as Guest</button>
      </div>
    </div>

    <!-- Right column for other content -->
    <div class="right-column" v-if="cartItems.length > 0 && proceedToCheckout">
      <OrderSummary
        :cartItems="cartItems"
        :discount="discount"
        :total="cartTotalWithShipping"
        :shippingCost="currentShippingCost"
      />
      <PaymentOptions />
      <ShippingOptions @updateShippingCost="updateShippingCost" />
      <PromoCode @discountApplied="applyDiscount" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cartStore';
import { useUserStore } from '../stores/authStore';
import { CartItemType } from '@/types';
import CartItem from '@/components/Cart/CartItem.vue';
import OrderSummary from '@/components/Cart/OrderSummary.vue';
import PaymentOptions from '@/components/Cart/PaymentOptions.vue';
import ShippingOptions from '@/components/Cart/ShippingOptions.vue';
import PromoCode from '@/components/Cart/PromoCode.vue';

const cartStore = useCartStore();
const userStore = useUserStore();

const router = useRouter();

const cartItems = computed(() => cartStore.cartItems);

const showAuthModal = ref(false);

const discount = ref(0);
const proceedToCheckout = ref(false);

const cartTotal = computed(() => {
  return cartItems.value.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
});

const removeFromCart = (item: CartItemType) => {
  cartStore.removeFromCart(item.id);
};

const emptyCart = () => {
  cartStore.emptyCart();
};

const initiateCheckout = () => {
  if (!userStore.isAuthenticated) {
    // If the user is not authenticated, show the authentication modal
    showAuthModal.value = true;
  } else {
    // If the user is authenticated, proceed directly
    proceedToCheckout.value = true;
  }
};

const redirectToLogin = () => {
  router.push({ name: 'SignIn' });
};

const continueAsGuest = () => {
  // If the user chooses to continue as a guest, hide the modal and show the right column
  showAuthModal.value = false;
  proceedToCheckout.value = true;
};

const applyDiscount = (discountValue: number) => {
  discount.value = discountValue;
};

const shippingCost = ref(3.0);

const cartSubtotal = computed(() => {
  return cartItems.value.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
});

const currentShippingCost = ref(3.0);

const updateShippingCost = (cost: number) => {
  currentShippingCost.value = cost;
};

const cartTotalWithShipping = computed(() => {
  return cartSubtotal.value + shippingCost.value - discount.value;
});
</script>

<style scoped>
.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.left-column {
  padding: 20px;
  background-color: var(--neutral-light);
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
  background-color: var(--neutral-light);
  color: var(--neutral-dark);
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 5px;
  transition:
    background-color 0.3s,
    transform 0.3s;
}

/* Style the "Proceed to Checkout" button */
.cart-footer button {
  background-color: var(--button-color); /* Updated to use the coral color */
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 10px;
}

.cart-footer button:hover {
  background-color: #ff5050; /* A slightly darker shade of coral for hover */
  transform: scale(1.05);
}

.cart-footer button:last-child {
  margin-right: 0;
}

/* Style the cart item container */
.cart-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  text-align: center;
  border: 1px solid var(--neutral-dark);
  background-color: var(--neutral-light);
  border-radius: 5px;
  transition: box-shadow 0.3s;
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
  border-radius: 5px;
}

.cart-item:hover {
  box-shadow: 0 4px 12px rgba(0/ 0/ 0/ 10%);
}

.right-column {
  padding: 20px;
  background-color: #f7f9fc;
  background-color: var(--neutral-light);
  border-radius: 5px;
}

/* To add spacing between each component in the right column */
.right-column > div {
  margin-bottom: 20px;
}

.auth-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: var(--neutral-light);
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0/ 0/ 0/ 10%);
  width: 80%;
  max-width: 400px;
  border-radius: 5px;
}

h1,
h2 {
  color: var(--primary-color);
  font-family: Poppins, sans-serif;
}

p {
  color: var(--neutral-dark);
}
</style>
