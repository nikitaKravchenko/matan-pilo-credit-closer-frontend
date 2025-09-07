export const removeRepeatObject = (obj1, obj2) => {
  const newObj = {id: obj1.id};
  for (let key in obj1) {
    if ((obj1[key] !== obj2[key]) && obj1[key] && obj1[key]) {
      newObj[key] = obj1[key];
    }
  }

  return newObj;
}