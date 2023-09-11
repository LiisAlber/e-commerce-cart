import { ref, computed, watch } from "vue";
import { CartItem } from "@/types"; 

export function useCart() {
  const cartItems = ref<CartItem[]>([]);
  const isCartOpen = ref(false);

  const numCartItems = computed(() => 
    cartItems.value.reduce((numItems, item) => numItems + item.quantity, 0)
  );

  const cartTotal = computed(() =>
    cartItems.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );

  const showCart = () => {
    isCartOpen.value = true;
  };

  const hideCart = () => {
    isCartOpen.value = false;
  };

  const addToCart = (product: CartItem) => {
    const found = cartItems.value.find(item => item.id === product.id);
    if (found) {
      found.quantity += product.quantity;
    } else {
      cartItems.value.push(product);
    }
  };

  const removeFromCart = (productId: number) => {
    const index = cartItems.value.findIndex(item => item.id === productId);
    if (index !== -1) {
      cartItems.value.splice(index, 1);
    }
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const found = cartItems.value.find(item => item.id === productId);
    if (found) {
      found.quantity = quantity;
    }
  };

  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cartItems.value = JSON.parse(storedCart);
  }

  watch(cartItems, (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
  }, { deep: true });

  const clearCart = () => {
    cartItems.value = [];
    localStorage.removeItem("cart");
  };

  return {
    cartItems,
    isCartOpen,
    numCartItems,
    cartTotal,
    showCart,
    hideCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
}

