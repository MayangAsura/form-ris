// "use client";

import { queryClientConfig } from "../configs/tanstack";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function TanstackProvider({
  children,
}) {
  return (
    <QueryClientProvider client={queryClientConfig}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
