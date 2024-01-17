import { z } from 'zod';

const AirportCode = z.string()
  .trim()
  .regex(/[A-Za-z]{3}/)
  .toUpperCase();

const DateString = z.string()
  .regex(/\d{4}-\d{2}-\d{2}/)
  .refine((dateString) => {
    return !isNaN(new Date(dateString).getTime());
  });

export const QueryValues = z.object({
  origin: AirportCode,
  destination: AirportCode,
  dateRange: z.object({
    start: DateString,
    end: DateString,
  }),
});
