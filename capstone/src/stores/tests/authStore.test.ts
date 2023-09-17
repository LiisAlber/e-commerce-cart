import { test, expect } from 'vitest';
import { useUserStore } from '@/stores/authStore';
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

const pinia = createPinia();

test('initializes with no user', () => {
  const store = useUserStore(pinia);
  expect(store.user).toBeNull();
  expect(store.isAuthenticated).toBe(false);
});

test('signs up a user', () => {
  const store = useUserStore(pinia);
  store.signUp('test@email.com', 'password123');
  expect(store.user).toEqual({
    email: 'test@email.com',
    password: 'password123',
  });
  expect(store.isAuthenticated).toBe(true);
});

test('signs in a user successfully', () => {
  const store = useUserStore(pinia);
  store.signUp('test@email.com', 'password123');
  const result = store.signIn('test@email.com', 'password123');
  expect(result).toBe(true);
  expect(store.isAuthenticated).toBe(true);
});

test('fails to sign in with incorrect credentials', () => {
  const store = useUserStore(pinia);
  store.signUp('test@email.com', 'password123');
  const result = store.signIn('wrong@email.com', 'wrongpass');
  expect(result).toBe(false);
  expect(store.isAuthenticated).toBe(true);
});

test('signs out a user', () => {
  const store = useUserStore(pinia);
  store.signUp('test@email.com', 'password123');
  store.signOut();
  expect(store.user).toBeNull();
  expect(store.isAuthenticated).toBe(false);
});
