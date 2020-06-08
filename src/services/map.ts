// inaccuracies in the package @types/yandex-maps
import {
  IPlacemarkOptions,
  IGeometry,
  IGeoObjectCollection,
} from '../types/ymap';


//    constant

const ADDRESS_MARK_STYLE = 'islands#yellowDotIcon';
const CAB_MARK_STYLE = 'islands#darkGreenAutoIcon';
const INVALID_MARK_STYLE = 'islands#redDotIcon';
const MAX_CAB_AMOUNT = 10;

const VALID_ADDRESS_MARK_OPTIONS = {
  preset: ADDRESS_MARK_STYLE,
} as IPlacemarkOptions;

const INVALID_ADDRESS_MARK_OPTIONS = {
  preset: INVALID_MARK_STYLE,
} as IPlacemarkOptions;

const CAB_MARK_OPTIONS = {
  preset: CAB_MARK_STYLE,
} as IPlacemarkOptions;

const VALID_ADDRESS_MARK_PROPERTIES = {};

const INVALID_ADDRESS_MARK_PROPERTIES = {
  iconCaption: 'Адрес не найден',
};

const CAB_MARK_PROPERTIES = {};

const DEFAULT_MAP_OPTIONS = {
  center: [55.76, 37.64],
  zoom: 7,
};
const ERRORS = {
  FIND_BY_PLACEMARK: 'Не удалось определить улицу и номер дома.',
  FIND_BY_ADDRESS: 'Не возможно найти адрес на карте.',
  API: 'Нет связи с сервером геолокации.',
};


//    type

export interface IMarkData {
  address: string,
  lat: number,
  lon: number,
}

export interface IAddressError {
  error: string,
  lat?: number,
  lon?: number,
}

export interface addressMarkObserver{
  (data: IMarkData | IAddressError): any
}

export interface ICabInfo {
  crew_id: number,
  car_mark: string,
  car_model: string,
  car_color: string,
  car_number: string,
  driver_name: string,
  driver_phone: string,
  lat: number,
  lon: number,
  distance: number
}


//    service


class MapServices {
  private map: ymaps.Map | null = null;

  private addressMark: ymaps.Placemark | null = null;

  private invalidAddressMark: ymaps.Placemark | null = null;

  private cabMarks: ymaps.Placemark[] = [];

  private addressMarkSubscribers: addressMarkObserver[] = [];


  static moveMark(mark: ymaps.Placemark, coords: number[]) {
    if (mark.geometry) {
      const geometry = mark.geometry as IGeometry; // inaccuracies in the package @types/yandex-maps
      geometry.setCoordinates(coords);
    }
  }

  static async getAddress(coords: number[]): Promise<string | null> {
    try {
      const response = await window.ymaps.geocode(coords) as IGeoObjectCollection;

      const streetName = response.geoObjects.get(0).getThoroughfare();
      const houseNumber = response.geoObjects.get(0).getPremiseNumber();
      if (streetName && houseNumber) return `${streetName}, ${houseNumber}`;
      return null;
    } catch (e) {
      const { message } = e as Error;
      console.log(`Ошибка при определении адреса пользователя. ${message}`);
      return null;
    }
  }

  static createCabMark(coords: number[]) {
    return new window.ymaps.Placemark(
      coords,
      CAB_MARK_PROPERTIES,
      CAB_MARK_OPTIONS,
    );
  }


  private async createMap(id: string) {
    if (!this.map) {
      try {
        const location = await window.ymaps.geolocation.get() as IGeoObjectCollection;
        const bounds = location.geoObjects.get(0).properties.get('boundedBy', {}) as number[];
        const mapState = window.ymaps.util.bounds.getCenterAndZoom(bounds, [300, 300]);

        const myMap = new window.ymaps.Map(id, mapState);
        this.map = myMap;
      } catch (e) {
        const myMap = new window.ymaps.Map(id, DEFAULT_MAP_OPTIONS);
        this.map = myMap;
      }
      this.map.events.add('click', this.placeAddressMark);
    }
  }

  private createAddressMark() {
    this.addressMark = new window.ymaps.Placemark(
      [55.76, 37.64],
      VALID_ADDRESS_MARK_PROPERTIES,
      VALID_ADDRESS_MARK_OPTIONS,
    );
  }

  private createInvalidAddressMark() {
    this.invalidAddressMark = new window.ymaps.Placemark(
      [55.76, 37.64],
      INVALID_ADDRESS_MARK_PROPERTIES,
      INVALID_ADDRESS_MARK_OPTIONS,
    );
  }


  private createCabMarks = async () => {
    for (let i = 0; i < MAX_CAB_AMOUNT; i += 1) {
      const mark = MapServices.createCabMark([55.76, 37.64]);
      this.cabMarks.push(mark);
    }
  };

  private changeInvalidMarkToValid(coords: number[]) {
    if (this.map && this.invalidAddressMark && this.addressMark) {
      this.map.geoObjects.remove(this.invalidAddressMark);
      MapServices.moveMark(this.addressMark, coords);
      this.map.geoObjects.add(this.addressMark);
    }
  }

  private changeValidMarkToInvalid(coords: number[]) {
    if (this.map && this.invalidAddressMark && this.addressMark) {
      this.map.geoObjects.remove(this.addressMark);
      MapServices.moveMark(this.invalidAddressMark, coords);
      this.map.geoObjects.add(this.invalidAddressMark);
    }
  }


  private placeAddressMark = async (e: object | ymaps.IEvent) => {
    const event = e as ymaps.IEvent;
    const coords = event.get('coords') as number[];
    if (this.addressMark && this.map) {
      const address = await MapServices.getAddress(coords);
      if (address) {
        this.changeInvalidMarkToValid(coords);
        const data: IMarkData = {
          address,
          lat: coords[0],
          lon: coords[1],
        };
        this.notifyAll(data);
      } else {
        this.changeValidMarkToInvalid(coords);
        const data: IAddressError = {
          error: ERRORS.FIND_BY_PLACEMARK,
          lat: coords[0],
          lon: coords[1],
        };
        this.notifyAll(data);
      }
    }
  };


  private notifyAll(data: IMarkData | IAddressError) {
    this.addressMarkSubscribers.forEach((subs) => subs(data));
  }

  displayCabLocation = async (data: ICabInfo[]) => {
    const amount = Math.min(data.length, MAX_CAB_AMOUNT);
    for (let i = 0; i < amount; i += 1) {
      const loc = [data[i].lat, data[i].lon];
      if (this.cabMarks[i]) {
        MapServices.moveMark(this.cabMarks[i], loc);
      } else {
        this.cabMarks[i] = MapServices.createCabMark(loc);
      }
      if (this.map) this.map.geoObjects.add(this.cabMarks[i]);
    }
  };

  deleteAddressMarksFromMap() {
    if (this.map && this.addressMark && this.invalidAddressMark) {
      this.map.geoObjects.remove(this.addressMark);
      this.map.geoObjects.remove(this.invalidAddressMark);
    }
  }

  deleteCabFromMap = async () => {
    this.cabMarks.forEach((cab) => {
      if (this.map) this.map.geoObjects.remove(cab);
    });
  };

  async getCoordinate(address: string): Promise<IMarkData | IAddressError> {
    if (this.map) {
      const options = {
        boundedBy: this.map.getBounds(),
        result: 1,
      };
      try {
        const response = await window.ymaps.geocode(address, options) as IGeoObjectCollection;
        const firstGeoObject = response.geoObjects.get(0);
        if (firstGeoObject) {
          const coords = firstGeoObject.geometry.getCoordinates();
          const bounds = firstGeoObject.properties.get('boundedBy', {}) as number[][];
          if (this.addressMark) {
            this.changeInvalidMarkToValid(coords);
            this.map.setBounds(bounds, {
              checkZoomRange: true,
            });
          }
          return {
            address,
            lat: coords[0],
            lon: coords[1],
          };
        }
      } catch (e) {
        this.deleteAddressMarksFromMap();
        return { error: ERRORS.API };
      }
    }
    this.deleteAddressMarksFromMap();
    return { error: ERRORS.FIND_BY_ADDRESS };
  }

  onAddressMarkChange(func: addressMarkObserver) {
    this.addressMarkSubscribers.push(func);
  }

  unsubscribeAddressMark(func: addressMarkObserver) {
    this.addressMarkSubscribers = this.addressMarkSubscribers.filter((el) => !(el === func));
  }

  init(id: string) {
    window.ymaps.ready(() => {
      this.createMap(id);
      this.createAddressMark();
      this.createInvalidAddressMark();
      this.createCabMarks();
    });
  }
}

const mapService = new MapServices();

export default mapService;
