<template>
    <div class="shipping-options">
      <h3>Shipping Options</h3>
      <select v-model="selectedOption">
        <option value="standard">Standard Shipping</option>
        <option value="express">Express Shipping</option>
      </select>
      <p v-if="selectedOption === 'express'">Estimated delivery: 1-2 days</p>
      <p v-else>Estimated delivery: 5-7 days</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const selectedOption = ref('standard');
  </script>
  
  <style scoped>
.shipping-options {
    padding: 1rem;
    border: 1px solid #ccc;
    margin-bottom: 20px;
}

.shipping-option {
    margin: 10px 0;
}
</style>
