import { z } from 'zod';

export const QueryValues = z.object({
  origin: z.string(),
  destination: z.string(),
  dateRange: z.object({
    start: z.string(),
    end: z.string(),
  }),
});
