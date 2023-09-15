import { defineStore } from 'pinia';
import { Product, CartItemType } from '@/types/index.ts';

export const useCartStore = defineStore('cart', {
    // State
    state: () => ({
        cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItemType[],
        isCartOpen: false,
    }),
  
    // Getters
    getters: {
        total(state) {
            return state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        }
    },

    // Actions
    actions: {
        addToCart(product: Product) {
            const existingProduct = this.cartItems.find((item: CartItemType) => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                this.cartItems.push({ ...product, quantity: 1 });
            }
            this.saveCartToLocalStorage();
        },

        removeFromCart(productId: number) {
            const index = this.cartItems.findIndex((item: CartItemType) => item.id === productId);
            if (index !== -1) this.cartItems.splice(index, 1);
            this.saveCartToLocalStorage();
        },

        updateQuantity({ productId, quantity }: { productId: number; quantity: number }) {
            const product = this.cartItems.find((item: CartItemType) => item.id === productId);
            if (product) product.quantity = quantity;
            this.saveCartToLocalStorage();
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

        // Utility methods for LocalStorage
        saveCartToLocalStorage() {
            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        }
    }
});
