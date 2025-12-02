<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{ note: any }>()
const emit = defineEmits(['delete', 'save'])

const editing = ref(false)
const title = ref(props.note.title)
const content = ref(props.note.content)

function startEdit() {
  editing.value = true
}

function cancel() {
  editing.value = false
  title.value = props.note.title
  content.value = props.note.content
}

function save() {
  emit('save', props.note._id, { title: title.value, content: content.value })
  editing.value = false
}

function remove() {
  emit('delete', props.note._id)
}
</script>

<template>
  <v-card outlined>
    <v-card-text>
      <div v-if="!editing">
        <v-row>
          <v-col>
            <h3>{{ note.title }}</h3>
            <p>{{ note.content }}</p>
            <small>{{ new Date(note.createdAt).toLocaleString() }}</small>
          </v-col>
        </v-row>
      </div>

      <div v-else>
        <v-text-field v-model="title" label="Title" />
        <v-textarea v-model="content" label="Content" rows="3" />
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn small text v-if="!editing" @click="startEdit">Edit</v-btn>
      <v-btn small text color="red" v-if="!editing" @click="remove">Delete</v-btn>

      <v-btn small text v-if="editing" @click="save">Save</v-btn>
      <v-btn small text v-if="editing" @click="cancel">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
</style>
