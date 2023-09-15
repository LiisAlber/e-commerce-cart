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
