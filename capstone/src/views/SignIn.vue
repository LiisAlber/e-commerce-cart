<template>
  <div class="sign-in">
    <h2>Sign In</h2>
    <form @submit.prevent="handleSignIn">
      <input type="text" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Sign In</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/authStore';

export default {
  name: 'SignIn',
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const userStore = useUserStore();
    const router = useRouter();

    const handleSignIn = () => {
      if (userStore.signIn(email.value, password.value)) {
        router.push('/'); // redirect to home page on successful sign in
      } else {
        error.value = 'Invalid email or password!';
      }
    };

    return { email, password, handleSignIn, error };
  },
};
</script>

<style scoped>
/* Utilizing your root colors */

/* Base styles for the Sign-In container */
.sign-in {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid var(--neutral-light);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0/ 0/ 0/ 10%);
  background-color: #fff;
}

/* Heading styles */
.sign-in h2 {
  margin-bottom: 20px;
  text-align: center;
  color: var(--neutral-dark);
}

/* Form styles */
.sign-in form {
  display: flex;
  flex-direction: column;
}

/* Input fields styles */
.sign-in input {
  margin-bottom: 15px;
  padding: 10px 15px;
  border: 1px solid var(--neutral-light);
  border-radius: 5px;
  font-size: 16px;
  color: var(--neutral-dark);
  outline: none;
  transition: border 0.3s;
}

.sign-in input:focus {
  border-color: var(--primary-color);
}

/* Button styles */
.sign-in button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: var(--button-color);
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.sign-in button:hover {
  background-color: var(--secondary-color);
}

/* Error message styling */
.sign-in p {
  color: var(--item-link-color);
  font-size: 14px;
  text-align: center;
}
</style>
