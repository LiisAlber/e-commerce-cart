<template>
  <div class="cart-item">
    <div class="product-details">
      <img :src="item.image" alt="Product image" class="product-image">
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
  max-width: 80px; 
  margin-right: 10px; 
}

.product-info {
  flex-grow: 1; 
}

.product-info h2 {
  font-size: 16px; 
}

</style>

