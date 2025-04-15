import { router } from './trpc';
import { drawingRouter } from './routers/drawing';

export const appRouter = router({
  drawing: drawingRouter,
});

export type AppRouter = typeof appRouter;