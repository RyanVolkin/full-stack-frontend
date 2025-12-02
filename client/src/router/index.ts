import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import NotesList from "../components/NotesList.vue";
import AddNote from "../components/AddNote.vue";

const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/", component: NotesList },
  { path: "/create", component: AddNote },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
