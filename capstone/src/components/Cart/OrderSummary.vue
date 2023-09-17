<template>
  <div class="order-summary">
    <h3>Order Summary</h3>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        <span class="item-title" :title="item.title">{{
          truncateTitle(item.title)
        }}</span>
        <span class="item-quantity">x {{ item.quantity }}</span>
        <span class="item-total"
          >€{{ (item.price * item.quantity).toFixed(2) }}</span
        >
      </li>
    </ul>
    <p>
      <strong>Total before discount: €{{ originalTotal.toFixed(2) }}</strong>
    </p>
    <p>
      <strong>Discount: -€{{ discountValue.toFixed(2) }}</strong>
    </p>
    <p>
      <strong>Shipping Cost: €{{ shippingCost.toFixed(2) }}</strong>
    </p>
    <p>
      <strong
        >Total after discount and shipping: €{{
          totalWithShipping.toFixed(2)
        }}</strong
      >
    </p>
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
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  shippingCost: {
    type: Number,
    required: true,
  },
});

const originalTotal = computed(() =>
  props.cartItems.reduce(
    (acc, item: CartItem) => acc + item.price * item.quantity,
    0,
  ),
);
const discountValue = computed(() =>
  Number((originalTotal.value * props.discount).toFixed(2)),
);

const totalWithShipping = computed(() =>
  Number(
    (originalTotal.value - discountValue.value + props.shippingCost).toFixed(2),
  ),
);

// Function to truncate long titles
const truncateTitle = (title: string, maxLength: number = 25) => {
  return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
};
</script>

<style scoped>
.order-summary {
  padding: 1.5rem;
  border: 1px solid var(--neutral-dark);
  background-color: var(--neutral-light);
  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(0/ 0/ 0/ 5%);
  margin-bottom: 20px;
}

h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-family: Poppins, sans-serif;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 1rem;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid var(--neutral-dark);
  transition: background-color 0.3s;
}

li:hover {
  background-color: rgba(0/ 123/ 255/ 5%);
}

.item-title {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 1rem;
  color: var(--neutral-dark);
}

.item-quantity {
  flex-basis: 50px;
  text-align: right;
  padding-right: 1rem;
  color: var(--neutral-dark);
}

.item-total {
  flex-basis: 100px;
  text-align: right;
  color: var(--neutral-dark);
}

strong {
  color: var(--primary-color);
}

p {
  margin: 0.5rem 0;
}
</style>
