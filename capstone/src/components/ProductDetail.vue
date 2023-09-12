<template>
  <div class="product-detail">
    <h2>{{ selectedProduct?.title }}</h2>
    <img :src="selectedProduct?.image" :alt="selectedProduct?.title" class="product-image" />
    <p class="product-description">{{ selectedProduct?.description }}</p>
    <p class="product-price">Price: €{{ selectedProduct?.price }}</p>
    <button @click="addProductToCart(selectedProduct)" v-if="selectedProduct">Add to Cart</button>
    <button @click="goToCart">Close</button>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Product } from '@/types/index.ts';
import { useCartStore } from '../stores/cartStore';
import { fakestoreAPI } from '../../api/fakeStore';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const selectedProduct = ref<Product | null>(null);

const addProductToCart = (product: Product) => {
  cartStore.addToCart(product);
};

const fetchProductDetails = async () => {
  const productId = Number(route.params.id);

  try {
    // Make an API request to fetch the product details by productId
    const response = await fakestoreAPI.get<Product>(`/products/${productId}`);
    selectedProduct.value = response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

onMounted(() => {
  fetchProductDetails();
});

watch(route, () => {
  fetchProductDetails();
});

const goToCart = () => {
  // Use router to navigate back to the cart view
  router.push({ name: 'Cart' });
};
</script>


<style scoped>
.product-detail {
  max-width: 600px; /* Adjust the maximum width as needed */
  margin: 0 auto;
  padding: 10px; /* Adjust the padding as needed */
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.product-image {
  max-width: 100%; /* Limit image width */
  height: auto; /* Maintain aspect ratio */
  margin-bottom: 20px;
  display: block; /* Ensure the image respects max-width */
}

.product-description {
  margin-bottom: 10px;
}

.product-price {
  font-weight: bold;
}

button {
  margin-top: 10px;
}
</style>

  