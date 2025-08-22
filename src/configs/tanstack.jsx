import { QueryClient } from "@tanstack/react-query";

export const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const QUERIES = {
  AUTH: {
    VERIFY_PASSWORD_RESET_TOKEN: "verify-password-reset-token",
  },
  USER: {
    GET_USER: "get-user",
    UPDATE_USER: "update-user",
  },
};
