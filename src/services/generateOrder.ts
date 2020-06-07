
interface ILocation {
  address:string,
  lat: number,
  lon: number
}

interface IData {
  source_time: string,
  addresses: ILocation[],
  crew_id: number,
}

const generateOrder = (request: IData) => {
  const { crew_id: id } = request;

  const mock = {
    code: 200,
    descr: 'OK',
    data: {
      order_id: `99${id}`,
    },
  };

  return new Promise<string>((res) => {
    setTimeout(() => res(JSON.stringify(mock)), 600);
  });
};

export default generateOrder;
