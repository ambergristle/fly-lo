
export const getSearchParam = (url: URL, key: string) => {
  return url.searchParams.get(key) ?? '';
};
