import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url, route, params }) => {
  console.log({ url, route, params });
  return {
    results: [
      {
        airline: 'AFKLM',
        origin: 'SFO',
        destination: 'ATH',
        points: 50000,
      },
    ],
  };
};
