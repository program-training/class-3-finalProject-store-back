export const hasRequiredKeys = (obj: Record<string, unknown>, keys: string[]) => {
  return keys.every((key) => key in obj);
};
