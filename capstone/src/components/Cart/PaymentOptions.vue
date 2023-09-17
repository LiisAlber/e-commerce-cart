<template>
  <div class="payment-options">
    <h3>Payment Options</h3>
    <div class="icon-container">
      <i class="fab fa-cc-visa fa-2x payment-icon"></i>
      <i class="fab fa-cc-mastercard fa-2x payment-icon"></i>
    </div>
    <input class="payment-input card-number" placeholder="Card Number" />
    <div class="short-inputs">
      <input class="payment-input expiry-date" placeholder="Expiry Date" />
      <input class="payment-input cvv" placeholder="CVV" />
    </div>
  </div>
</template>

<style scoped>
.payment-options {
  padding: 1rem;
  border: 1px solid var(--neutral-dark);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-container {
  display: flex;
  justify-content: center;
  gap: 20px; /* Space between icons */
  margin-bottom: 20px;
}

.payment-icon {
  cursor: pointer;
  transition: transform 0.3s;
}

.payment-icon:hover {
  transform: scale(1.1);
}

.payment-input {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--neutral-dark);
  border-radius: 5px;
  font-size: 16px;
}

.card-number {
  width: 250px;
}

.short-inputs {
  display: flex;
  gap: 10px; /* Space between the two short input fields */
}

.expiry-date,
.cvv {
  width: 120px;
}
</style>
