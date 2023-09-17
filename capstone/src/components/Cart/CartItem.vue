<template>
  <div class="cart-item">
    <div class="product-details">
      <img :src="item.image" alt="Product image" class="product-image" />
      <div class="product-info">
        <h2>
          <router-link :to="'/product/' + item.id">
            {{ item.title }}
          </router-link>
        </h2>
        <p>Price: €{{ item.price.toFixed(2) }}</p>
        <p>Quantity: {{ item.quantity }}</p>
        <button @click="$emit('increment', item.id)">+</button>
        <button @click="$emit('decrement', item.id)">-</button>
        <button @click="$emit('remove', item.id)">Remove from Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CartItemType } from '@/types/index.ts';

defineProps({
  item: {
    type: Object as () => CartItemType,
    required: true,
  },
});
</script>

<style scoped>
.cart-item {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  background-color: var(--neutral-light);
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 4px 12px rgba(0/ 0/ 0/ 5%);
  transition: box-shadow 0.3s;
}

.cart-item:hover {
  box-shadow: 0 6px 15px rgba(0/ 0/ 0/ 10%);
}

.product-image {
  max-width: 80px;
  margin-right: 10px;
  border-radius: 5px;
}

.product-info {
  flex-grow: 1;
}

.product-info h2 a,
.product-info h2 a:visited {
  color: var(--link-color);
  text-decoration: none;
}

.product-info h2 a:hover {
  color: #ff5050;
  text-decoration: underline;
}

.product-link:hover {
  color: #ff5050;
}

.quantity-btn,
.remove-btn {
  margin: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.quantity-btn {
  background-color: var(--neutral-dark);
  color: #fff;
}

.remove-btn {
  background-color: var(--button-color);
  color: #fff;
}

.quantity-btn:hover {
  background-color: #2a2a2a;
}

.remove-btn:hover {
  background-color: #ff5050;
}
</style>
