
const transform = (v: number) => {
  if (v < 10) return `0${v}`;
  return `${v}`;
};

const getDate = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const second = date.getSeconds();

  return `${year}${transform(month)}${transform(day)}${transform(hours)}${transform(minutes)}${transform(second)}`;
};

export default getDate;
