import { createTRPCReact, httpBatchLink, loggerLink } from "@trpc/react-query";
import type { AppRouter } from "../server/api/root";
import { CreateTRPCReactOptions } from "@trpc/react-query/shared";
import SuperJSON from "superjson";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; //browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; //SSR should use vercel url
  return `https://localhost.${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const trpc = createTRPCReact<AppRouter>({});

export const trpcClient = trpc.createClient({
  // https://trpc.io/docs/links
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      async headers() {
        return {
          //authorization: getAuthCookie(),
        };
      },
      // https://trpc.io/docs/data-transformers
      transformer: SuperJSON,
    }),
  ],
});

/*
export const api = createTRPCNext<AppRouter>({
  config() {
    return {};
  },
  // https://trpc.io/docs/nextjs#ssr-boolean-default-false
  ssr: true, // Enable Server-Side Rendering (if needed)
});
*/
