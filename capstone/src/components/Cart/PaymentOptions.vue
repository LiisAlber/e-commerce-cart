<template>
  <div class="payment-options">
    <h3>Payment Options</h3>
    <i class="fab fa-cc-visa fa-2x"></i>
    <i class="fab fa-cc-mastercard fa-2x"></i>

    <input placeholder="Card Number" />
    <input placeholder="Expiry Date" />
    <input placeholder="CVV" />
  </div>
</template>

<style scoped>
.payment-options {
  padding: 1rem;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

.payment-options img {
  width: 40px;
  margin-right: 10px;
}
</style>
