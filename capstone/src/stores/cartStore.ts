import { defineStore } from 'pinia';
import { Product, CartItemType } from '@/types/index.ts';
import { useUserStore } from '@/stores/authStore';

export const useCartStore = defineStore('cart', {
  // State
  state: () => {
    const userStore = useUserStore();
    const storageKey = userStore.isAuthenticated
      ? 'cartItems'
      : 'guestCartItems';
    return {
      cartItems: JSON.parse(
        localStorage.getItem(storageKey) || '[]',
      ) as CartItemType[],
      isCartOpen: false,
      discount: 0, // Represents the discount percentage (e.g., 10 for 10%)
    };
  },

  // Getters
  getters: {
    total(state) {
      const subtotal = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      return subtotal * (1 - state.discount / 100); // Calculate the total after applying the discount
    },
  },

  // Actions
  actions: {
    addToCart(product: Product) {
      const existingProduct = this.cartItems.find(
        (item: CartItemType) => item.id === product.id,
      );
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
      this.saveCartToStorage();
    },

    removeFromCart(productId: number) {
      const index = this.cartItems.findIndex(
        (item: CartItemType) => item.id === productId,
      );
      if (index !== -1) this.cartItems.splice(index, 1);
      this.saveCartToStorage();
    },

    updateQuantity({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) {
      const product = this.cartItems.find(
        (item: CartItemType) => item.id === productId,
      );
      if (product) product.quantity = quantity;
      this.saveCartToStorage();
    },

    incrementQuantity(product: Product) {
      const existingProduct = this.cartItems.find(
        (item: CartItemType) => item.id === product.id,
      );
      if (existingProduct) {
        existingProduct.quantity++;
      }
      this.saveCartToStorage();
    },

    decrementQuantity(product: Product) {
      const existingProduct = this.cartItems.find(
        (item: CartItemType) => item.id === product.id,
      );
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity--;
      }
      this.saveCartToStorage();
    },

    showCart() {
      this.isCartOpen = true;
    },

    hideCart() {
      this.isCartOpen = false;
    },

    emptyCart() {
      this.cartItems = [];
      this.saveCartToStorage();
    },

    // Utility methods for Storage
    saveCartToStorage() {
      const userStore = useUserStore();
      const storageKey = userStore.isAuthenticated
        ? 'cartItems'
        : 'guestCartItems';
      localStorage.setItem(storageKey, JSON.stringify(this.cartItems));
    },
  },
});
