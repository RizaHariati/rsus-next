export const addZeroString = (id: string) => {
  const num = id.slice(4);
  const code = id.slice(0, 3);
  const newNum = parseInt(num) + 1;
  if (newNum < 10) {
    return code + "-00" + newNum;
  } else if (newNum < 100) {
    return code + "-0" + newNum;
  } else {
    return code + "-" + newNum;
  }
};
