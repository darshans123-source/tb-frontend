/**
 * API client helper for backend communication with Render production API URL
 */

const envApiUrl = (import.meta as any).env?.VITE_API_BASE_URL;
export const API_BASE_URL = (envApiUrl || 'https://tb-backend-w2qy.onrender.com/api').replace(/\/$/, '');

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('tb_quest_jwt_token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${cleanEndpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}: Error performing API request`);
  }

  return data as T;
}
