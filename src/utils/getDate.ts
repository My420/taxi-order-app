const getDate = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const second = date.getSeconds();

  return `${year + month + day + hours + minutes + second}`;
};

export default getDate;
