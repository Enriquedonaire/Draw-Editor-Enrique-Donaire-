import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server';

export const POST = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  });

export const GET = POST;