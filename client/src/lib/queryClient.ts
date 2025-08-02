import { QueryClient } from "@tanstack/react-query";

const makeRequest = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, {
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