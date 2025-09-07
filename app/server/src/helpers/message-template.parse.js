export const messageTemplateParse = (string, obj, arr = ['DATE', 'AMOUNT', 'LOAN_ID']) => {
  const newObj = [];

  for(let key of string.split('%')) {
    if(arr.some(e => e === key)) {
      let str = obj[key.toLowerCase()] || '%NOT FOUND%';
      if(key === 'AMOUNT') {
        str = '$' + str;
      }
      newObj.push(str);
    } else {
      newObj.push(key);
    }
  }

  return newObj.join('');
}