const BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000';

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const AuthApi = {
  signup: (email: string, password: string) => api<{ token: string; user: { email: string } }>(`/auth/signup`, { method: 'POST', body: JSON.stringify({ email, password }) }),
  login: (email: string, password: string) => api<{ token: string; user: { email: string } }>(`/auth/login`, { method: 'POST', body: JSON.stringify({ email, password }) }),
};

export const DataApi = {
  counsellors: () => api<Array<{id:number;name:string;specialty:string;availability:string}>>('/counsellors'),
  resources: () => api<Array<{id:number;title:string;type:string}>>('/resources'),
  health: () => api<{status:string;time:string}>('/health'),
};


