<template>
  <div class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product as Product"
      :isExpanded="isExpanded"
      :toggleExpanded="toggleExpanded"
      :truncatedDescription="truncatedDescription"
      :isTruncated="isTruncated"
      :onAddToCart="addProductToCart"
      :onSelectProduct="selectProduct"
    />

    <div
      v-if="selectedProduct"
      class="product-modal-overlay"
      @click="closeModal"
    >
      <div class="modal-content" @click.stop>
        <h2>{{ selectedProduct.title }}</h2>
        <img :src="selectedProduct.image" alt="selectedProduct.title" />
        <p>{{ selectedProduct.description }}</p>
        <p>Price: €{{ selectedProduct.price }}</p>
        <button
          @click="
            addProductToCart({
              id: selectedProduct.id,
              title: selectedProduct.title,
              price: selectedProduct.price,
              description: selectedProduct.description,
              category: selectedProduct.category,
              image: selectedProduct.image,
            })
          "
        >
          Add to Cart
        </button>

        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import { fakestoreAPI } from '../../api/fakeStore';
import { Product } from '@/types/index.ts';
import { useCartStore } from '../stores/cartStore';

const cartStore = useCartStore();

const addProductToCart = (product: Product) => {
  cartStore.addToCart(product);
};

const products = ref<Product[]>([]);
const expandedProductIds = ref<number[]>([]);

const isExpanded = (productId: number) => {
  return expandedProductIds.value.includes(productId);
};

const toggleExpanded = (productId: number) => {
  if (isExpanded(productId)) {
    const index = expandedProductIds.value.indexOf(productId);
    expandedProductIds.value.splice(index, 1);
  } else {
    expandedProductIds.value.push(productId);
  }
};

const MAX_LENGTH = 100;

const truncatedDescription = (description: string) => {
  return description.length > MAX_LENGTH
    ? description.substring(0, MAX_LENGTH) + '...'
    : description;
};

const isTruncated = (description: string) => {
  return description.length > MAX_LENGTH;
};

onMounted(async () => {
  try {
    const response = await fakestoreAPI.get<Product[]>('/products');
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

const selectedProduct = ref<Product | null>(null);

const selectProduct = (product: Product) => {
  selectedProduct.value = product;
};

const closeModal = () => {
  selectedProduct.value = null;
};
</script>

<style>
body,
button,
input,
textarea {
  font-family: Roboto, sans-serif;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  background-color: #e1e2e4;
  padding: 2rem 0;
}

.product-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(52/ 55/ 64/ 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #f7f9fc;
  padding: 1rem;
  border-radius: 8px;
  width: 80%;
  max-width: 300px;
  min-width: 200px;
  box-shadow: 0 4px 6px rgba(0/ 0/ 0/ 5%);
  overflow: auto;
  max-height: 80vh;
}

.modal-content img {
  width: 100%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.modal-content h2 {
  color: #ed8936;
  margin-top: 0;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.modal-content p {
  color: #333740;
  margin: 10px 0;
  font-size: 16px;
  line-height: 1.5;
}

.modal-content button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  background-color: #5a67d8;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.modal-content button:hover {
  background-color: #4c58c2;
}

.modal-content button:last-child {
  margin-top: 20px;
  background-color: #ed8936;
}

.modal-content button:last-child:hover {
  background-color: #d87a2d;
}

@media (max-width: 768px) {
  .modal-content {
    width: 90%;
  }
}
</style>
