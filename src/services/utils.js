function getFullDate(timeStamp) {
  const date = new Date(timeStamp);
  const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}  ${date.getHours()}:${
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
  }`;
  return dateString;
}

export const utilService = {
  getFullDate,
};
