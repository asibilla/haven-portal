const oneDay = 1000 * 60 * 60 * 24;
export const cutoff1Range = oneDay * 44;
export const cutoff2Range = oneDay * 20;
export const cutoff3Range = oneDay * 7;

export const toDate = (date) => {
  if (typeof date === 'string') {
    return new Date(date);
  }
  return date;
};

export const calculateMaxDate = ({ days, spinDate }) => {
  const maxDate = toDate(spinDate).getTime() + days;
  return new Date(maxDate).toString();
};

const formatDate = (date) => {
  const dateFormatter = new Intl.DateTimeFormat('en-US');
  return dateFormatter.format(toDate(date));
};

export default formatDate;
