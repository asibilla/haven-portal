export const createError = (message) => {
  const error = new Error();
  error.message = message;
  return error;
};

export const formatDate = (dateString) => {
  const formatter = new Intl.DateTimeFormat('en-US');
  return formatter.format(new Date(dateString));
};
