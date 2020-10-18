export const createError = (message) => {
  const error = new Error();
  error.message = message;
  return error;
};

export { default as formatDate } from './dateFormatter';
