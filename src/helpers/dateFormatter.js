const oneDay = 1000 * 60 * 60 * 24;
export const cutoff2Range = oneDay * 20;
export const cutoff3Range = oneDay * 7;
export const fortyFourDays = oneDay * 44;

const formatDate = (date) => {
  const dateFormatter = new Intl.DateTimeFormat('en-US');
  let d = date;
  if (typeof d === 'string') {
    d = new Date(date);
  }
  return dateFormatter.format(d);
};

export const calculateMaxDate = ({ days, spinDate }) => {
  let d = spinDate;
  if (typeof d === 'string') {
    d = new Date(spinDate);
  }
  const maxDate = d.getTime() + days;
  return new Date(maxDate);
};

export default formatDate;
