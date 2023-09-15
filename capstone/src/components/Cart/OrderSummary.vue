<template>
    <div class="order-summary">
      <h3>Order Summary</h3>
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          <span class="item-title" :title="item.title">{{ truncateTitle(item.title) }}</span>
          <span class="item-quantity">x {{ item.quantity }}</span>
          <span class="item-total">€{{ (item.price * item.quantity).toFixed(2) }}</span>
        </li>
      </ul>
      <p><strong>Total before discount: €{{ originalTotal.toFixed(2) }}</strong></p>
      <p><strong>Discount: -€{{ discountValue.toFixed(2) }}</strong></p>
      <p><strong>Total after discount: €{{ total.toFixed(2) }}</strong></p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type CartItem = {
    id: number;
    title: string;
    price: number;
    quantity: number;
};

const props = defineProps({
    cartItems: {
        type: Array as () => CartItem[],
        required: true
    },
    discount: {
        type: Number,
        default: 0
    }
});

const originalTotal = computed(() => props.cartItems.reduce((acc, item: CartItem) => acc + item.price * item.quantity, 0));
const discountValue = computed(() => Number((originalTotal.value * props.discount).toFixed(2)));
const total = computed(() => Number((originalTotal.value - discountValue.value).toFixed(2)));

// Function to truncate long titles
const truncateTitle = (title: string, maxLength: number = 25) => {
  return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
}
</script>

<style scoped>
.order-summary {
    padding: 1rem;
    border: 1px solid #ccc;
    margin-bottom: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-bottom: 1px solid #eee;
}

.item-title {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 1rem;
}

.item-quantity {
    flex-basis: 50px;
    text-align: right;
    padding-right: 1rem;
}

.item-total {
    flex-basis: 100px;
    text-align: right;
}
</style>


  