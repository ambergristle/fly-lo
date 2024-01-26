
/**
 * @param {*} value 
 * @returns {value is number}
 */
export const isNumber = (value) => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * @param {*} value 
 * @returns {value is undefined}
 */
export const isUndefined = (value) => {
  return typeof value === 'undefined';
};
