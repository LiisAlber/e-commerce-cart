<template>
    <div class="home">
      <!-- Logo -->
      <img src="@/assets/logo.png" alt="MyShop Logo" class="logo">

      <h1>Welcome to MyShop!</h1>
      <p>Explore our collection of the best products.</p>
    </div>
</template>
  
  <script lang="ts" setup>
  
  </script>
  
  <style scoped>
.home {
    background-color: #F7F9FC;
    padding: 3rem;
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.logo {
    width: 40%; 
    margin-bottom: 1.5rem;
}

h1 {
    color: #ED8936; 
    font-weight: bold;
}

p {
    color: #333740;
    font-size: 18px;
}
</style>
  