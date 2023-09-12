<template>
  <div class="cart-item">
    <div class="product-details">
      <img :src="item.image" alt="Product image" class="product-image">
      <div class="product-info">
        <h2><router-link :to="'/product/' + item.id">{{ item.title }}</router-link></h2>
        <p>Price: €{{ item.price.toFixed(2) }}</p>
        <p>Quantity: {{ item.quantity }}</p>
        <button @click="$emit('increment', item)">+</button>
        <button @click="$emit('decrement', item)">-</button>
        <button @click="$emit('remove', item)">Remove from Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CartItemType } from '@/types/index.ts';

defineProps({
  item: {
    type: Object as () => CartItemType,
    required: true
  }
});
</script>

<style scoped>
.cart-item {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.product-image {
  max-width: 80px; /* Adjust the maximum width of the image as needed */
  margin-right: 10px; /* Add some spacing between the image and text */
}

.product-info {
  flex-grow: 1; /* Allow the product info to expand to fill available space */
}

.product-info h2 {
  font-size: 16px; /* Adjust the font size of the product title */
}

/* Add more styles as needed */
</style>

