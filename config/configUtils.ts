export const validateEnvVariable = (env: string | undefined, message: string, defaultValue: string): string => {
  if (!env && process.env.NODE_ENV === 'production') {
    throw new Error(message);
  }
  return env || defaultValue;
};
