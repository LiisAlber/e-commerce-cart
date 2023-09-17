import { test, expect } from 'vitest';
import { useCartStore } from '../../stores/cartStore';
import { createPinia } from 'pinia';

// Mock localStorage for the testing environment
const localStorageMock = (function () {
  let store: { [key: string]: string } = {};

  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem: function (key: string) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

type CartItemType = {
  id: number;
  price: number;
  title: string;
  description: string;
  category: string;
  image: string;
};

function setupCartStore() {
  const pinia = createPinia();
  return useCartStore(pinia);
}

test('initializes the cart with an empty array', () => {
  const store = setupCartStore();
  expect(store.cartItems).toEqual([]);
});

test('adds a product to the cart', () => {
  const store = setupCartStore();
  const item: CartItemType = {
    id: 1,
    price: 10,
    title: 'Test Product',
    description: 'Test Description',
    category: 'Test Category',
    image: 'test.jpg',
  };
  store.addToCart(item);
  expect(store.cartItems).toEqual([{ ...item, quantity: 1 }]);
});

test('removes a product from the cart', () => {
  const store = setupCartStore();
  const item: CartItemType = {
    id: 1,
    price: 10,
    title: 'Test Product',
    description: 'Test Description',
    category: 'Test Category',
    image: 'test.jpg',
  };
  store.addToCart(item);
  store.removeFromCart(item.id);
  expect(store.cartItems).toEqual([]);
});

test('increments quantity of a product in the cart', () => {
  const store = setupCartStore();
  const item: CartItemType = {
    id: 1,
    price: 10,
    title: 'Test Product',
    description: 'Test Description',
    category: 'Test Category',
    image: 'test.jpg',
  };
  store.addToCart(item);
  store.incrementQuantity(item);
  expect(store.cartItems[0].quantity).toEqual(2);
});

test('decrements quantity of a product in the cart', () => {
  const store = setupCartStore();
  const item: CartItemType = {
    id: 1,
    price: 10,
    title: 'Test Product',
    description: 'Test Description',
    category: 'Test Category',
    image: 'test.jpg',
  };
  store.addToCart(item);
  store.incrementQuantity(item);
  store.decrementQuantity(item);
  expect(store.cartItems[0].quantity).toEqual(3);
});
