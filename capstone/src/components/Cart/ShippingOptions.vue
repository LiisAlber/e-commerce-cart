<template>
  <div class="shipping-options">
    <h3>Shipping Options</h3>
    <div class="select-container">
      <select
        v-model="selectedOption"
        class="shipping-select"
        @change="updateDeliveryDate"
      >
        <option value="standard">Standard Shipping (€3.00)</option>
        <option value="express">Express Shipping (€8.00)</option>
      </select>
    </div>
    <p>Estimated delivery: {{ deliveryDate }}</p>
    <p>Total Shipping Fee: {{ shippingCost }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const selectedOption = ref('standard');
const deliveryDate = ref('5-7 days');

const shippingCost = computed(() => {
  if (selectedOption.value === 'express') {
    return '€8.00';
  } else {
    return '€3.00';
  }
});

const updateDeliveryDate = () => {
  if (selectedOption.value === 'express') {
    deliveryDate.value = '1-2 days';
    emit('updateShippingCost', 8.0);
  } else {
    deliveryDate.value = '5-7 days';
    emit('updateShippingCost', 3.0);
  }
};

watch(selectedOption, (newValue) => {
  if (newValue === 'express') {
    emit('updateShippingCost', 8);
  } else {
    emit('updateShippingCost', 5);
  }
});

// Use Vue's defineEmits to define the event this component will emit
const emit = defineEmits(['updateShippingCost']);

// Calling this function initially to set the default delivery date.
updateDeliveryDate();
</script>

<style scoped>
.shipping-options {
  padding: 1rem;
  border: 1px solid var(--neutral-dark);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  margin-bottom: 10px;
}

.select-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.shipping-select {
  padding: 10px;
  border: 1px solid var(--neutral-dark);
  border-radius: 5px;
  font-size: 16px;
  background-color: var(--neutral-light);
}

p {
  margin-top: 10px;
}
</style>
