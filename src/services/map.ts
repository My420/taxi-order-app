// inaccuracies in the package @types/yandex-maps
import {
  IPlacemarkOptions,
  IGeometry,
  IGeoObjectCollection,
} from '../types/ymap';
import { ADDRESS_MARK_STYLE, DEFAULT_MAP_OPTIONS } from '../utils/constant';

interface IClickData {
  address: string,
  lat: number,
  lon: number,
}

interface observer{
  (data: IClickData | string): any
}


class MapServices {
  private map: ymaps.Map | null = null;

  private addressMark: ymaps.Placemark | null = null;

  private subscribers: observer[] = [];

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
      this.map.events.add('click', this.onMapClick);
    }
  }

  private createAddressMark() {
    const options = {
      preset: ADDRESS_MARK_STYLE,
    } as IPlacemarkOptions;

    this.addressMark = new window.ymaps.Placemark([55.76, 37.64], {}, options);
  }

  private onMapClick = async (e: object | ymaps.IEvent) => {
    const event = e as ymaps.IEvent;
    const coords = event.get('coords') as number[];
    if (this.addressMark && this.map) {
      MapServices.moveMark(this.addressMark, coords);
      this.map.geoObjects.add(this.addressMark);
      const address = await MapServices.getAddress(coords);
      if (address) {
        const data: IClickData = {
          address,
          lat: coords[0],
          lon: coords[1],
        };
        this.notifyAll(data);
      } else {
        this.notifyAll('Не удалось определить улицу и номер дома.');
      }
    }
  };

  private notifyAll(data: IClickData | string) {
    this.subscribers.forEach((subs) => subs(data));
  }

  async getCoordinate(address: string): Promise<number[] | null> {
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
        return coords;
      }
    }
    return null;
  }

  subscribe(func: observer) {
    this.subscribers.push(func);
  }

  unsubscribe(func: observer) {
    this.subscribers = this.subscribers.filter((el) => !(el === func));
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
