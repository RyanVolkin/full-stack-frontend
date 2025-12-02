import { ref } from "vue";
import {
  login as apiLogin,
  register as apiRegister,
  getCurrentUser,
} from "../services/api";

const user = ref<{ email?: string } | null>(null);
let token: string | null = null;
function setToken(t: string | null) {
  if (t) token = t;
  else token = null;
}

function getToken() {
  return token;
}

export async function login(email: string, password: string) {
  const res = await apiLogin(email, password);
  if (res.token) {
    setToken(res.token);
    // fetch user profile after storing token
    const me = await getCurrentUser();
    if (me?.unauthorized) {
      // token invalid immediately after login (unlikely), clear and return
      setToken(null);
      return { message: "Unauthorized" };
    }
    user.value = me || { email };
    return true;
  }
  return res;
}

export async function init() {
  const token = getToken();
  if (!token) return;
  const me = await getCurrentUser();
  if (me?.unauthorized) {
    setToken(null);
    user.value = null;
    return;
  }
  if (me && !me.message) user.value = me;
}

export async function register(email: string, password: string) {
  return apiRegister(email, password);
}

export function logout() {
  setToken(null);
  user.value = null;
}

export function isAuthenticated() {
  return !!getToken();
}

export default function useAuth() {
  return { user, login, register, logout, isAuthenticated, init };
}

export function useToken() {
  return { getToken, setToken };
}
