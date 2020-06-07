import generateOrder from './generateOrder';
import getDate from '../utils/getDate';

export interface ILocation {
  address:string,
  lat: number,
  lon: number
}

export interface IOrderError {
  error: string,
}

export interface IOrderData {
  orderID: number,
}

export interface IOrderRequest {
  source_time: string,
  addresses: ILocation[],
  crew_id: number,
}

export interface IOrderAnswer {
  code: number,
  descr: string,
  data:{
    order_id: number,
  }
}

const getOrder = async (data: ILocation, crewID: number): Promise<IOrderAnswer> => {
  const requestData: IOrderRequest = {
    source_time: getDate(),
    addresses: [data],
    crew_id: crewID,
  };

  try {
    const answer = await generateOrder(requestData);
    return JSON.parse(answer) as IOrderAnswer;
  } catch (e) {
    const { message } = e as Error;
    return {
      code: 400,
      descr: message,
      data: {
        order_id: 0,
      },
    };
  }
};

export const findOrder = async (
  address: ILocation,
  crewID: number): Promise<IOrderData | IOrderError> => {
  const response = await getOrder(address, crewID);
  const { code, descr, data: { order_id: id } } = response;

  if (code !== 200) return { error: descr };
  return { orderID: id };
};
