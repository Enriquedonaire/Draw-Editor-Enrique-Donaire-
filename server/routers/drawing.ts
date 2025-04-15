import { z } from 'zod';
import { router, publicProcedure } from '../trpc';


let drawingStore: any = null;

export const drawingRouter = router({
  getDrawing: publicProcedure.query(() => {
    return drawingStore;
  }),
  
  saveDrawing: publicProcedure
    .input(z.any())
    .mutation(({ input }) => {
      drawingStore = input;
      console.log('Drawing saved:', input);
      return { success: true };
    }),
});