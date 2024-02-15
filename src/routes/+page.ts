import type { PageLoad } from './$types';

/**
 * chaining load functions
 * https://github.com/sveltejs/kit/discussions/8942
 */

export const load: PageLoad = async ({ data, fetch }) => {

  const { form } = data;

  if (!form.valid) return { form };
  
  const { origin, destination, dateRange } = form.data;

  const searchParams = new URLSearchParams({
    origin,
    destination,
    start: dateRange.start,
    end: dateRange.end,
  });

  const response = fetch(`/api/offers?${searchParams}`)
    .then((res) => res.json());

  return {
    form,
    data: response,
  };


};
