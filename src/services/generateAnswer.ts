
interface ILocation {
  address:string,
  lat: number,
  lon: number
}

interface ICrewRequest {
  source_time: string,
  addresses: ILocation[]
}

const generateAnswer = (request: ICrewRequest) => {
  const requestData = request.addresses[0];
  const { lat, lon } = requestData;

  const mock = {
    code: 200,
    descr: 'OK',
    data: {
      crews_info: [
        {
          crew_id: 123,
          car_mark: 'Chevrolet',
          car_model: 'Lacetti',
          car_color: 'синий',
          car_number: 'Е234КУ',
          driver_name: 'Деточкин',
          driver_phone: '7788',
          lat: lat + 3,
          lon: lon + 3,
          distance: 900,
        }, {
          crew_id: 125,
          car_mark: 'Hyundai',
          car_model: 'Solaris',
          car_color: 'белый',
          car_number: 'Ф567АС',
          driver_name: 'Петров',
          driver_phone: '8899',
          lat: lat + 2,
          lon: lon + 2,
          distance: 600,
        }, {
          crew_id: 127,
          car_mark: 'Lada',
          car_model: 'Vesta',
          car_color: 'черный',
          car_number: 'Е134КР',
          driver_name: 'Васильев',
          driver_phone: '8989',
          lat: lat - 2,
          lon: lon - 2,
          distance: 600,
        },
        {
          crew_id: 130,
          car_mark: 'KIA',
          car_model: 'Ceed',
          car_color: 'красный',
          car_number: 'А875КР',
          driver_name: 'Семенов',
          driver_phone: '456456',
          lat: lat + 1,
          lon: lon + 1,
          distance: 300,
        },
      ],
    },
  };

  return new Promise<string>((res) => {
    setTimeout(() => res(JSON.stringify(mock)), 600);
  });
};

export default generateAnswer;
