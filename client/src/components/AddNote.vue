<script setup lang="ts">
import { createNote } from '../services/api'
import { ref } from 'vue'
const title = ref('')
const content = ref('')


async function add() {
  const res = await createNote({ title: title.value, content: content.value })
  if (res._id) {
    title.value = ''
    content.value = ''
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card class="pa-4 mb-4">
        <v-card-title>Your Notes</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="add">
            <v-text-field v-model="title" label="Title" />
            <v-textarea v-model="content" label="Write something..." rows="3" />
            <v-btn type="submit" color="primary" class="mt-3">Add Note</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>