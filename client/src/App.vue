<script setup lang="ts">
import { RouterView, RouterLink, useRouter } from 'vue-router'
import useAuth from './composables/useAuth'

const { user, logout } = useAuth()
const router = useRouter()


</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <RouterLink to="/" style="color:inherit; text-decoration:none">Notes App</RouterLink>
      </v-toolbar-title>

      <v-spacer />
      <v-btn text class="mx-2" v-if="user" :to="{ path: '/' }">Notes</v-btn>
      <v-btn text class="mx-2" v-if="user" :to="{ path: '/create' }">Create Note</v-btn>
      <v-btn text class="mx-2" v-if="user" @click="logout" :to="{ path: '/login' }">Logout</v-btn>
      <v-btn text class="mx-2" v-if="!user" :to="{ path: '/login' }">Login</v-btn>
      <v-btn text class="mx-2" v-if="!user" :to="{ path: '/register' }">Register</v-btn>

    </v-app-bar>
    <v-main>
      <v-container class="pa-4">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>