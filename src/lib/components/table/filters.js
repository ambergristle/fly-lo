import { isNumber } from '$lib/utils/types';

/**
 * value is lte filterValue
 * @param {{ filterValue: unknown, value: unknown }} param 
 */
export const minFilter = ({ filterValue, value }) => {
  if (!isNumber(filterValue) || !isNumber(value)) return true;
  return filterValue >= value;
};
