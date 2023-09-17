<template>
  <div class="promo-code">
    <input v-model="code" placeholder="Enter promo code (e.g., promo10)" />
    <button @click="applyCode">Apply</button>
    <!-- Success and Error Messages -->
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const code = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const emit = defineEmits(['discountApplied']);

const applyCode = () => {
  const promoCodePattern = /^PROMO[0-9]+$/i;

  if (promoCodePattern.test(code.value)) {
    successMessage.value = 'Discount Applied!';
    emit('discountApplied', 0.1);
    errorMessage.value = ''; // Reset the error message
  } else {
    errorMessage.value = 'Invalid Promo Code! Hint: Try promo10';
    successMessage.value = ''; // Reset the success message
  }
};
</script>

<style scoped>
.promo-code {
  padding: 1rem;
  border: 1px solid var(--neutral-dark);
  margin-bottom: 20px;
}

.promo-code input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  margin-top: 10px;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>
