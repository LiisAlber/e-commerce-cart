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
    };
  },

  // Getters
  getters: {
    total(state) {
      return state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
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
      this.saveCartToStorage(); // Adjusted the name here for clarity
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

    // Methods for toggling cart visibility
    showCart() {
      this.isCartOpen = true;
    },

    hideCart() {
      this.isCartOpen = false;
    },

    emptyCart() {
      this.cartItems = [];
      localStorage.setItem('cart', JSON.stringify([]));
    },

    // Utility methods for Storage

    saveCartToStorage() {
      const userStore = useUserStore();
      const storageKey = userStore.isAuthenticated ? 'cartItems' : 'guestCartItems';
      localStorage.setItem(storageKey, JSON.stringify(this.cartItems));
  }
  
  },
});
