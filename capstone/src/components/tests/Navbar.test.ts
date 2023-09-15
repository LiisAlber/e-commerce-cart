import { test, expect } from 'vitest';
import { useUserStore } from '../../stores/authStore';
import { createPinia } from 'pinia';

// Mock localStorage for the testing environment
const localStorageMock = (function() {
    let store: { [key: string]: string } = {};

    return {
        getItem: function(key: string) {
            return store[key] || null;
        },
        setItem: function(key: string, value: string) {
            store[key] = value.toString();
        },
        removeItem: function(key: string) {
            delete store[key];
        },
        clear: function() {
            store = {};
        }
    };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });


type User = {
    email: string;
    password: string;
};

function setupUserStore() {
    const pinia = createPinia();
    return useUserStore(pinia);
}

test('initializes the user with null', () => {
  const store = setupUserStore();
  expect(store.user).toBeNull();
});

test('signs up a user and stores them', () => {
    const store = setupUserStore();
    const user: User = {
        email: 'test@example.com',
        password: 'password123',
    };
    store.signUp(user.email, user.password);
    expect(store.user).toEqual(user);
    expect(store.isAuthenticated).toBe(true);
});

test('signs in a user successfully', () => {
    const store = setupUserStore();
    const user: User = {
        email: 'test@example.com',
        password: 'password123',
    };
    store.signUp(user.email, user.password);
    const loginSuccess = store.signIn(user.email, user.password);
    expect(loginSuccess).toBe(true);
    expect(store.isAuthenticated).toBe(true);
});

test('fails to sign in with wrong credentials', () => {
    const store = setupUserStore();
    const user: User = {
        email: 'test@example.com',
        password: 'password123',
    };
    store.signUp(user.email, user.password);
    const loginFail = store.signIn('wrong@example.com', 'wrongPassword');
    expect(loginFail).toBe(false);
});

test('signs out the user', () => {
    const store = setupUserStore();
    const user: User = {
        email: 'test@example.com',
        password: 'password123',
    };
    store.signUp(user.email, user.password);
    store.signOut();
    expect(store.user).toBeNull();
    expect(store.isAuthenticated).toBe(false);
});
