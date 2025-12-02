import { useToken } from "../composables/useAuth";
const { getToken } = useToken();

const BASE = "https://full-stack-backend-e9vg.onrender.com";

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function safeFetch(input: string, init?: RequestInit) {
  try {
    const res = await fetch(input, init);
    if (res.status === 401 || res.status === 403) {
      return { unauthorized: true, status: res.status };
    }
    const data = await res.json().catch(() => null);
    if (!res.ok)
      return { message: data?.message || "Request failed", status: res.status };
    return data;
  } catch (err: any) {
    return { message: err?.message || "Network error" };
  }
}

export async function register(email: string, password: string) {
  return safeFetch(`${BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export async function login(email: string, password: string) {
  return safeFetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export async function getCurrentUser() {
  return safeFetch(`${BASE}/auth/me`, {
    headers: { ...authHeaders(), "Content-Type": "application/json" },
  });
}

export async function getNotes() {
  return safeFetch(`${BASE}/notes`, {
    headers: { ...authHeaders(), "Content-Type": "application/json" },
  });
}

export async function createNote(payload: { title: string; content: string }) {
  return safeFetch(`${BASE}/notes`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function updateNote(
  id: string,
  payload: { title?: string; content?: string },
) {
  return safeFetch(`${BASE}/notes/${id}`, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function deleteNote(id: string) {
  console.log("Deleting note with ID:", id);
  return safeFetch(`${BASE}/notes/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
  });
}
