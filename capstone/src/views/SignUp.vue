<template>
  <div class="sign-up">
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignUp">
      <input type="text" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Sign Up</button>
    </form>
    <p v-if="success">{{ success }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/authStore';

export default {
  name: 'SignUp',
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const success = ref('');
    const userStore = useUserStore();
    const router = useRouter();

    const handleSignUp = () => {
      userStore.signUp(email.value, password.value);
      success.value = 'Successfully signed up!';
      setTimeout(() => router.push('/signin'), 2000); // redirect to sign in page after 2 seconds
    };

    return { email, password, handleSignUp, success, error };
  },
};
</script>
