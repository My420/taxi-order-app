// inaccuracies in the package @types/yandex-maps
import {
  IPlacemarkOptions,
  IGeometry,
  IGeoObjectCollection,
} from '../types/ymap';


const ADDRESS_MARK_STYLE = 'islands#yellowIcon';
const DEFAULT_MAP_OPTIONS = {
  center: [55.76, 37.64],
  zoom: 7,
};
const ERRORS = {
  FIND_BY_PLACEMARK: 'Не удалось определить улицу и номер дома.',
  FIND_BY_ADDRESS: 'Не возможно найти адрес на карте.',
};

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


class MapServices {
  private map: ymaps.Map | null = null;

  private addressMark: ymaps.Placemark | null = null;

  private addressMarkSubscribers: addressMarkObserver[] = [];

  static moveMark(mark: ymaps.Placemark, coords: number[]) {
    if (mark.geometry) {
      const geometry = mark.geometry as IGeometry; // inaccuracies in the package @types/yandex-maps
      geometry.setCoordinates(coords);
    }
  }

  static async getAddress(coords: number[]): Promise<string | null> {
    const response = await window.ymaps.geocode(coords) as IGeoObjectCollection;

    const streetName = response.geoObjects.get(0).getThoroughfare();
    const houseNumber = response.geoObjects.get(0).getPremiseNumber();
    if (streetName && houseNumber) return `${streetName}, ${houseNumber}`;
    return null;
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
    const options = {
      preset: ADDRESS_MARK_STYLE,
    } as IPlacemarkOptions;

    this.addressMark = new window.ymaps.Placemark([55.76, 37.64], {}, options);
  }

  private placeAddressMark = async (e: object | ymaps.IEvent) => {
    const event = e as ymaps.IEvent;
    const coords = event.get('coords') as number[];
    if (this.addressMark && this.map) {
      MapServices.moveMark(this.addressMark, coords);
      this.map.geoObjects.add(this.addressMark);
      const address = await MapServices.getAddress(coords);
      if (address) {
        const data: IMarkData = {
          address,
          lat: coords[0],
          lon: coords[1],
        };
        this.notifyAll(data);
      } else {
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

  async getCoordinate(address: string): Promise<IMarkData | IAddressError> {
    if (this.map) {
      const options = {
        boundedBy: this.map.getBounds(),
        result: 1,
      };
      const response = await window.ymaps.geocode(address, options) as IGeoObjectCollection;
      const firstGeoObject = response.geoObjects.get(0);
      if (firstGeoObject) {
        const coords = firstGeoObject.geometry.getCoordinates();
        const bounds = firstGeoObject.properties.get('boundedBy', {}) as number[][];
        if (this.addressMark) {
          MapServices.moveMark(this.addressMark, coords);
          this.map.geoObjects.add(this.addressMark);
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
    }
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
    });
  }
}

const mapService = new MapServices();

export default mapService;
