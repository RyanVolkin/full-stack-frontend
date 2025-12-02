<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getNotes, updateNote, deleteNote } from '../services/api'
import useAuth from '../composables/useAuth'

import NoteItem from './NoteItem.vue'

const notes = ref<any[]>([])
const error = ref('')

const searchFilter = ref('')

async function remove(id: string) {
  const res = await deleteNote(id)
  notes.value = notes.value.filter(n => n._id !== id)
}

async function saveEdit(id: string, payload: any) {
  const updated = await updateNote(id, payload)
  notes.value = notes.value.map(n => (n._id === id ? updated : n))
}

const { user } = useAuth()
onMounted(async () => {
  if (user) {
    error.value = ''
    const res = await getNotes()
    if (Array.isArray(res)) {
      notes.value = res
    } 
    else if (res?.unauthorized)
    {
      error.value = 'Login to view your notes'
    }
    else if(res?.status === 500)
    {
      error.value = 'Server error'
    }
    else{
      error.value = res?.message || 'Failed to load notes'
    }
  }
})

</script>

<template>
  <v-row>
    <v-col cols="12" >
      <v-text-field v-if="user" v-model="searchFilter" label="Search Notes" class="mb-3" />
      <v-alert v-else type="error" class="mb-3">{{ error }}</v-alert>
    </v-col>
    <v-row>
      <v-col cols="12" md="6" v-for="n in notes.filter(n => n.title.toLowerCase().includes(searchFilter.toLowerCase()))" :key="n._id">
        <NoteItem :note="n" @delete="remove" @save="saveEdit" />
      </v-col>
    </v-row>
  </v-row>
</template>

<style scoped>
.mb-3 { margin-bottom: 1rem }
.mb-4 { margin-bottom: 1.5rem }
.mt-3 { margin-top: 1rem }
</style>
