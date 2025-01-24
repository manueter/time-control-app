// src/utils/apiservice.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const refreshToken = async (oldToken: string): Promise<string | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: oldToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};