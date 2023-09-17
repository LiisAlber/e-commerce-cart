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

<style scoped>
/* Utilizing your root colors */
.sign-up {
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

.sign-up h2 {
  margin-bottom: 20px;
  text-align: center;
  color: var(--neutral-dark);
}

.sign-up form {
  display: flex;
  flex-direction: column;
}

.sign-up input {
  margin-bottom: 15px;
  padding: 10px 15px;
  border: 1px solid var(--neutral-light);
  border-radius: 5px;
  font-size: 16px;
  color: var(--neutral-dark);
  outline: none;
  transition: border 0.3s;
}

.sign-up input:focus {
  border-color: var(--primary-color);
}

.sign-up button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: var(--button-color);
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.sign-up button:hover {
  background-color: var(--secondary-color);
}

.sign-up p {
  font-size: 14px;
  text-align: center;
  color: var(--button-color);
  color: var(--secondary-color);
}
</style>
