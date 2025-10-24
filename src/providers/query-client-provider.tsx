"use client";

import {
  QueryClient,
  QueryClientProvider as OriginalQueryClientProvider
} from "@tanstack/react-query";

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1
      },
      mutations: {
        retry: 1
      }
    }
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
};

export const QueryClientProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const queryClient = getQueryClient();
  return (
    <OriginalQueryClientProvider client={queryClient}>
      {children}
    </OriginalQueryClientProvider>
  );
};
