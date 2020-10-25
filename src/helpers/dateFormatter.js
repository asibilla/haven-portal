export const oneDay = 1000 * 60 * 60 * 24;

export const toDate = (date) => {
  if (typeof date === 'string') {
    return new Date(date);
  }
  return date;
};

export const daysInMs = (days) => oneDay * days;

export const calculateMaxDate = ({ days, startDate }) => {
  const maxDate = toDate(startDate).getTime() + days;
  return new Date(maxDate).toString();
};

const formatDate = (date) => {
  const dateFormatter = new Intl.DateTimeFormat('en-US');
  return dateFormatter.format(toDate(date));
};

export default formatDate;
