import generateAnswer from './generateAnswer';
import getDate from '../utils/getDate';


export interface ILocation {
  address:string,
  lat: number,
  lon: number
}

export interface ICrewRequest {
  source_time: string,
  addresses: ILocation[]
}

export interface ICrewInfo {
  crew_id:number,
  car_mark:string,
  car_model:string,
  car_color:string,
  car_number:string,
  driver_name:string,
  driver_phone:string,
  lat:number,
  lon:number,
  distance:number
}

export interface ICrewAnswer {
  code: number,
  descr: string,
  data:{
    crews_info: ICrewInfo[]
  }
}

export interface ICrewError {
  error: string,
}

export interface ICrewData {
  data: ICrewInfo[],
}

const getCrew = async (data: ILocation): Promise<ICrewAnswer> => {
  const requestData: ICrewRequest = {
    source_time: getDate(),
    addresses: [data],
  };
  try {
    const answer = await generateAnswer(requestData);
    return JSON.parse(answer) as ICrewAnswer;
  } catch (e) {
    const { message } = e as Error;
    return {
      code: 400,
      descr: message,
      data: {
        crews_info: [],
      },
    };
  }
};

export const findCrew = async (data: ILocation): Promise<ICrewData | ICrewError> => {
  const response = await getCrew(data);
  const { code, descr, data: { crews_info: crews } } = response;

  if (code !== 200) return { error: descr };
  if (crews.length === 0) return { error: 'Не найдено ни одного экипажа.' };

  return { data: crews };
};
