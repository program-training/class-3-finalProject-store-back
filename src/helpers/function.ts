export const hasRequiredKeys = (obj: Record<string, any>, keys: string[]) => {
  return keys.every(key => key in obj);
};
