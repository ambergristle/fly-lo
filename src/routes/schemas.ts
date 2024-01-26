import { z } from 'zod';

const ZAirportCode = z.string()
  .trim()
  .regex(/[A-Za-z]{3}/)
  .toUpperCase();

const ZDateString = z.string()
  .regex(/\d{4}-\d{2}-\d{2}/)
  .refine((dateString) => {
    return !isNaN(new Date(dateString).getTime());
  });

export const ZQueryValues = z.object({
  origin: ZAirportCode,
  destination: ZAirportCode,
  dateRange: z.object({
    start: ZDateString,
    end: ZDateString,
  }),
});

export const ZQueryParams = z.object({
  origin: ZAirportCode,
  destination: ZAirportCode,
  start: ZDateString,
  end: ZDateString,
});
