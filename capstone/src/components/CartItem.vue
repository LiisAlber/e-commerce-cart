<template>
    <div class="cart-item">
        <img :src="item.image" alt="Product image">
        <div class="product-details">
            <h2>{{ item.title }}</h2>
            <p>Price: €{{ item.price.toFixed(2) }}</p>
            <p>Quantity: {{ item.quantity }}</p>
            <button @click="$emit('increment', item)">+</button>
            <button @click="$emit('decrement', item)">-</button>
            <button @click="$emit('remove', item)">Remove from Cart</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CartItem } from '@/types/index.ts'; 

defineProps({
  item: {
    type: Object as () => CartItem,
    required: true
  }
});
</script>



