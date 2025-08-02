import { QueryClient } from "@tanstack/react-query";

const API_BASE_URL = 'http://localhost:5000'; // Update this to your server URL

const makeRequest = async (url: string, options?: RequestInit) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: ({ queryKey }) => {
        const [url] = queryKey as [string];
        return makeRequest(url);
      },
    },
  },
});

export const apiRequest = (url: string, options?: RequestInit) => {
  return makeRequest(url, options);
};