<template>
  <div class="product-item" @click="showProductDetails(product)">
    <img :src="product.image" alt="product.title" />
    <h2>{{ product.title }}</h2>
    <p class="product-description" v-if="!isExpanded(product.id)">
      {{ truncatedDescription(product.description) }}
    </p>
    <p v-else>{{ product.description }}</p>

    <button
      class="ghost-button"
      v-if="isTruncated(product.description)"
      @click.stop="toggleExpanded(product.id)"
    >
      {{ isExpanded(product.id) ? 'Read less' : 'Read more' }}
    </button>

    <button class="ghost-button" @click.prevent.stop="addToCart">
      Add to Cart
    </button>
  </div>
</template>

<script lang="ts" setup>
import { Product } from '@/types/index.ts';
import { CartItemType } from '@/types/index.ts';

const props = defineProps({
  product: {
    type: Object as () => Product,
    required: true,
  },
  isExpanded: {
    type: Function as unknown as () => (productId: number) => boolean,
    required: true,
  },
  toggleExpanded: {
    type: Function as unknown as () => (productId: number) => void,
    required: true,
  },
  truncatedDescription: {
    type: Function as unknown as () => (description: string) => string,
    required: true,
  },
  isTruncated: {
    type: Function as unknown as () => (description: string) => boolean,
    required: true,
  },
  onAddToCart: {
    type: Function as unknown as () => (product: CartItemType) => void,
    required: true,
  },
  onSelectProduct: {
    type: Function as unknown as () => (product: Product) => void,
    required: true,
  },
});

const showProductDetails = (product: Product) => {
  props.onSelectProduct(product);
};

const addToCart = () => {
  props.onAddToCart({
    id: props.product.id,
    title: props.product.title,
    price: props.product.price,
    description: props.product.description,
    category: props.product.category,
    image: props.product.image,
    quantity: 1,
  });
};
</script>

<style scoped>
body,
button,
input,
textarea {
  font-family: Roboto, sans-serif;
}

.product-item {
  border: 1px solid #e1e7ed;
  padding: 1.5rem;
  margin: 15px;
  border-radius: 8px;
  max-width: 300px;
  background-color: #f7f9fc;
  box-shadow: 0 4px 6px rgba(0/ 0/ 0/ 5%);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  overflow: auto;
  flex-direction: column;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0/ 0/ 0/ 10%);
}

.product-item img {
  max-width: 100%;
  border-radius: 4px;
  object-fit: contain;
  aspect-ratio: 1/1;
  color: #333740;
}

.ghost-button {
  background: transparent;
  border: 2px solid #5a67d8;
  color: #333740;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background 0.3s,
    color 0.3s;
  margin-right: 10px;
}

.ghost-button:hover {
  background: #5a67d8;
  color: #f7f9fc;
}

.ghost-button:active {
  background-color: #4c58c2;
}

.ghost-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(90/ 103/ 216/ 50%);
}

.product-description {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-item h2 {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #ed8936;
}

.product-item p {
  font-size: 16px;
  color: #333740;
}

@media (max-width: 768px) {
  .product-item {
    max-width: 100%;
  }
}

.product-item .ghost-button:last-child {
  margin-right: 0;
}
</style>
