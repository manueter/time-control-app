// import { useState, useCallback } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import { refreshToken } from "../utils/apiService";

// interface UseFetchResult<T> {
//   data: T | null;
//   isLoading: boolean;
//   error: Error | null;
//   fetchData: () => Promise<void>;
// }

// export const useFetch = <T>(url: string, options?: RequestInit,  requiresAuth: boolean = false): UseFetchResult<T> => {
//   const [data, setData] = useState<T | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<Error | null>(null);
//   const { user, setUser } = useAuth();

//   const fetchData = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const fetchOptions = {
//         ...options,
//         headers: {
//           ...options?.headers,
//           ...(requiresAuth && user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
//         },
//       };

//       const response = await fetch(url, fetchOptions);
//       if (requiresAuth && response.status === 401) {
//         // Handle token expiration for authenticated requests
//         const newToken = await refreshToken(user?.token || "");
//         if (newToken) {
//           if (user?.user_uuid) {
//             setUser({ ...user, token: newToken });
//           } else {
//             console.error("Failed to update user: Missing user_uuid.");
//           }
//           // Retry the fetch with the new token
//           const retryResponse = await fetch(url, {
//             ...fetchOptions,
//             headers: {
//               ...fetchOptions.headers,
//               Authorization: `Bearer ${newToken}`,
//             },
//           });

//           if (!retryResponse.ok) {
//             throw new Error(`Retry failed: ${retryResponse.statusText}`);
//           }

//           const retryData: T = await retryResponse.json();
//           setData(retryData);
//         } else {
//           throw new Error("Failed to refresh token. Please log in again.");
//         }
//       } else if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       } else {
//         const result: T = await response.json();
//         setData(result);
//       }
//     } catch (err) {
//       setError(err as Error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [url, options, requiresAuth, user, setUser]);

//   return { data, isLoading, error, fetchData };
// };

import { useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { refreshToken } from "../utils/apiService";

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  fetchData: (body?: Record<string, unknown>) => Promise<void>;
}

export const useFetch = <T>(
  url: string,
  options: RequestInit = {},
  requiresAuth: boolean = false
): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user, setUser } = useAuth();

  const fetchData = useCallback(
    async (body?: Record<string, unknown>) => {
      setIsLoading(true);
      setError(null);

      try {
        const headers = prepareHeaders(
          options.headers,
          requiresAuth,
          user?.token
        );
        const fetchOptions = createFetchOptions(headers, body, options);

        let response = await fetch(url, fetchOptions);

        if (requiresAuth && response.status === 401) {
          response = await handleTokenExpiration(response, fetchOptions);
        }

        await processResponse(response);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [url, options, requiresAuth, user, setUser]
  );

  // Helper function to normalize headers
  const prepareHeaders = (
    headersInput: HeadersInit | undefined,
    requiresAuth: boolean,
    token?: string
  ): Record<string, string> => {
    let headers: Record<string, string> = {};

    if (headersInput instanceof Headers) {
      headersInput.forEach((value, key) => (headers[key] = value));
    } else if (Array.isArray(headersInput)) {
      headersInput.forEach(([key, value]) => (headers[key] = value));
    } else if (headersInput) {
      headers = { ...headersInput } as Record<string, string>;
    }

    if (requiresAuth && token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  };

  // Helper function to create fetch options
  const createFetchOptions = (
    headers: Record<string, string>,
    body?: Record<string, unknown>,
    options?: RequestInit
  ): RequestInit => ({
    ...options,
    headers,
    body: body ? JSON.stringify(body) : options?.body,
  });

  // Helper function to handle token expiration and retry
  const handleTokenExpiration = async (
    response: Response,
    fetchOptions: RequestInit
  ): Promise<Response> => {
    const newToken = await refreshToken(user?.token || "");
    if (!newToken) {
      throw new Error("Failed to refresh token. Please log in again.");
    }

    if (user?.user_uuid) {
      setUser({ ...user, token: newToken });

      fetchOptions.headers = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${newToken}`,
      };

      const retryResponse = await fetch(url, fetchOptions);
      if (!retryResponse.ok) {
        throw new Error(`Retry failed: ${retryResponse.statusText}`);
      }

      return retryResponse;
    } else {
      throw new Error(`Failed to update user: Missing user_uuid.`);
    }
  };

  // Helper function to process the response
  const processResponse = async (response: Response): Promise<void> => {
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result: T = await response.json();
    setData(result);
  };

  return { data, isLoading, error, fetchData };
};
