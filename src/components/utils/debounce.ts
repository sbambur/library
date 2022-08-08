export const debounce = <T extends Function>(fn: T, wait = 300) => {
  let timeout: ReturnType<typeof setTimeout>;
  let callable = (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
  return callable as any as T;
};
