const formatDate = (date) => {
  const dateFormatter = new Intl.DateTimeFormat('en-US');
  let d = date;
  if (typeof d === 'string') {
    d = new Date(date);
  }
  return dateFormatter.format(d);
};

export default formatDate;
