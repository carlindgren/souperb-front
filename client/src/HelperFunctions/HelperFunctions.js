export const getDateAndTime = (dateStr) => {
  const month = dateStr.split('').slice(5, 7).join('');
  const time = dateStr.split('').slice(11, 16).join('');
  const date = dateStr.split('').slice(8, 10).join('');

  return date + '/' + month + ' ' + time;
}; // ex. 29 augusti 10:30
