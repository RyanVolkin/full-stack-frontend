<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const { login } = useAuth()

async function submit() {
  error.value = ''
  const res = await login(email.value, password.value)
  if (res === true) {
    router.push('/')
  } else {
    error.value = res?.message || 'Login failed'
  }
}
</script>

<template>
  <v-row justify="center">
    <v-col cols="12" md="6" lg="4">
      <v-card>
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submit">
            <v-text-field v-model="email" label="Email" type="email" required />
            <v-text-field v-model="password" label="Password" type="password" required />
            <v-btn type="submit" color="primary" class="mt-4">Login</v-btn>
          </v-form>
          <v-alert type="error" v-if="error" class="mt-4">{{ error }}</v-alert>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.mt-4 { margin-top: 1rem }
</style>
