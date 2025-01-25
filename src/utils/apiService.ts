// src/utils/apiservice.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const refreshToken = async (
  oldToken: string
): Promise<string | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: oldToken }),
    });

    if (response.ok) {
      const { newToken } = await response.json();

      // const data = await response.json();
      // return data.token;

      return newToken;
    } else {
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {},
  token: string | null = null
) => {
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
