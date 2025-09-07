export const getCustomParams = (url) => {
  const start = url.indexOf('secret-key=');
  if (start === -1) {
    return false;
  }
  return url.slice(start + 11);
}

export const selectDataInRow = (string, obj, arr = ['DATE', 'AMOUNT', 'LOAN_ID']) => {
  const newObj = [];

  for (let key of string.split('%')) {
    if (arr.some(e => e === key)) {
      let str = obj[key.toLowerCase()] || '%NOT FOUND%';
      if (key === 'AMOUNT') {
        str = '$' + str;
      }
      newObj.push(str)
    } else {
      newObj.push(key);
    }
  }

  return newObj.join('');
}