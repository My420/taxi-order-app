// inaccuracies in the package @types/yandex-maps
import {
  IPlacemarkOptions,
  IGeometry,
  IGeoObjectCollection,
} from '../types/ymap';
import { ADDRESS_MARK_STYLE } from '../utils/constant';


export const createAddressMark = () => {
  const options = {
    preset: ADDRESS_MARK_STYLE,
  } as IPlacemarkOptions;

  return new window.ymaps.Placemark([55.76, 37.64], {}, options);
};

export const moveMark = (mark: ymaps.Placemark, coords: number[]) => {
  if (mark.geometry) {
    const a = mark.geometry as IGeometry; // inaccuracies in the package @types/yandex-maps
    a.setCoordinates(coords);
  }
};

export const getLocation = async (coords: number[]): Promise<string> => {
  const response = await window.ymaps.geocode(coords) as IGeoObjectCollection;

  const streetName = response.geoObjects.get(0).getThoroughfare();
  const houseNumber = response.geoObjects.get(0).getPremiseNumber();
  if (streetName && houseNumber) return `${streetName}, ${houseNumber}`;
  return response.geoObjects.get(0).getAddressLine();
};
