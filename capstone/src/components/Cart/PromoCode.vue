<template>
  <div class="promo-code">
    <input v-model="code" placeholder="Enter promo code (e.g., promo10)" />
    <button @click="applyCode">Apply</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const code = ref('');
const emit = defineEmits(['discountApplied']);

const applyCode = () => {
  const promoCodePattern = /^PROMO[0-9]+$/i;

  if (promoCodePattern.test(code.value)) {
    alert('Discount Applied!');
    emit('discountApplied', 0.1);
  } else {
    alert('Invalid Promo Code! Hint: Try promo10');
  }
};
</script>

<style scoped>
.promo-code {
  padding: 1rem;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

.promo-code input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  margin-top: 10px;
}
</style>
