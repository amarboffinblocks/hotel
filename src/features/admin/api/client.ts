const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://localhost:5000/api";

export type ApiResourceKey =
  | "rooms"
  | "offers"
  | "services"
  | "reviews"
  | "gallery"
  | "faqs";

const TOKEN_KEY = "grandview.admin.token";

export function getApiBaseUrl() {
  return API_URL;
}

export function getAdminToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

type ApiEnvelope<T> = { data: T; error?: string };

export class ApiClientError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  init: RequestInit & { auth?: boolean } = {}
): Promise<T> {
  const { auth = false, headers, ...rest } = init;
  const nextHeaders = new Headers(headers);

  if (!nextHeaders.has("Content-Type") && rest.body) {
    nextHeaders.set("Content-Type", "application/json");
  }

  if (auth) {
    const token = getAdminToken();
    if (token) nextHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: nextHeaders,
    mode: "cors",
  });

  const json = (await response.json().catch(() => ({}))) as ApiEnvelope<T> & {
    error?: string;
  };

  if (!response.ok) {
    throw new ApiClientError(
      response.status,
      json.error ?? `Request failed (${response.status})`
    );
  }

  return json.data;
}

export const api = {
  health: () => request<{ ok: boolean }>("/health"),

  login: (username: string, password: string) =>
    request<{ token: string; user: { username: string; role: string } }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
      }
    ),

  list: <T>(resource: ApiResourceKey) =>
    request<T[]>(`/${resource}`),

  get: <T>(resource: ApiResourceKey, id: string) =>
    request<T>(`/${resource}/${id}`),

  create: <T>(resource: ApiResourceKey, body: unknown) =>
    request<T>(`/${resource}`, {
      method: "POST",
      auth: true,
      body: JSON.stringify(body),
    }),

  update: <T>(resource: ApiResourceKey, id: string, body: unknown) =>
    request<T>(`/${resource}/${id}`, {
      method: "PATCH",
      auth: true,
      body: JSON.stringify(body),
    }),

  remove: (resource: ApiResourceKey, id: string) =>
    request<{ id: string }>(`/${resource}/${id}`, {
      method: "DELETE",
      auth: true,
    }),

  resetSeed: () =>
    request<{
      rooms: number;
      offers: number;
      services: number;
      reviews: number;
      gallery: number;
      faqs: number;
    }>("/seed/reset", {
      method: "POST",
      auth: true,
      body: JSON.stringify({}),
    }),

  upload: async (file: File, folder = "grandview") => {
    const form = new FormData();
    form.append("file", file);
    form.append("folder", folder);

    const token = getAdminToken();
    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: form,
    });

    const json = (await response.json().catch(() => ({}))) as {
      data?: { url: string; publicId: string };
      error?: string;
    };

    if (!response.ok) {
      throw new ApiClientError(
        response.status,
        json.error ?? "Upload failed"
      );
    }

    return json.data!;
  },
};
