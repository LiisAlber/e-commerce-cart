import { test, expect } from 'vitest';
import { useCartStore } from '@/stores/cartStore';
import { createPinia } from 'pinia';

const localStorageMock = (function() {
    let store: { [key: string]: string } = {};

    return {
        getItem: function(key: string) {
            return store[key] || null;
        },
        setItem: function(key: string, value: string) {
            store[key] = value.toString();
        },
        clear: function() {
            store = {};
        }
    };

})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

type Product = {
    id: number;
    price: number;
    title: string;
    description: string;
    category: string;
    image: string;
};

function setupStore() {
    const pinia = createPinia();
    return useCartStore(pinia);
}

test('initializes the cart with an empty array', () => {
  const store = setupStore();
  expect(store.cartItems).toEqual([]);
});

test('adds a product to the cart', () => {
    const store = setupStore();
    const product: Product = {
        id: 1,
        price: 10,
        title: 'Test Product',
        description: 'Test Description',
        category: 'Test Category',
        image: 'test.jpg'
    };
    store.addToCart(product);
    expect(store.cartItems).toEqual([{ ...product, quantity: 1 }]);
});

test('removes a product from the cart', () => {
  const store = setupStore();
  store.addToCart({
    id: 1,
    price: 10,
    title: 'Test Product',
    description: 'Test Description',
    category: 'Test Category',
    image: 'test.jpg'
  });
  store.removeFromCart(1);
  expect(store.cartItems).toEqual([]);
});

test('updates the quantity of a product in the cart', () => {
  const store = setupStore();
  store.addToCart({
    id: 1,
    price: 10,
    title: 'Test Product',
    description: 'Test Description',
    category: 'Test Category',
    image: 'test.jpg'
  });
  store.updateQuantity({ productId: 1, quantity: 2 });
  expect(store.cartItems[0].quantity).toEqual(2);
});

test('returns the total price of the cart', () => {
  const store = setupStore();
  store.addToCart({
    id: 1,
    price: 10,
    title: 'Test Product',
    description: 'Test Description',
    category: 'Test Category',
    image: 'test.jpg'
  });
  expect(store.total).toEqual(30);
});
