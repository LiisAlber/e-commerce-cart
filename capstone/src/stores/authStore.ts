import { defineStore } from 'pinia';

interface User {
  email: string;
  password: string;
}

export const useUserStore = defineStore('user', {
  state: (): { user: User | null } => ({
    user: JSON.parse(localStorage.getItem('mockUser') || 'null'),
  }),

  getters: {
    isAuthenticated(): boolean {
      return this.user !== null;
    },
  },

  actions: {
    signUp(email: string, password: string) {
      this.user = { email, password };
      localStorage.setItem('mockUser', JSON.stringify(this.user));
    },

    signIn(email: string, password: string) {
      const storedUser: User | null = JSON.parse(
        localStorage.getItem('mockUser') || 'null',
      );
      if (
        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        this.user = storedUser;
        return true; // login successful
      }
      return false; // login failed
    },

    signOut() {
      this.user = null;
    },
  },
});
