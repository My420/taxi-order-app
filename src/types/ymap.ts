// inaccuracies in the package @types/yandex-maps

/*
ymaps.d.ts

function geocode(request: string | number[], options?:{[key: string]: any}):
Promise<IGeoObjectCollection>;
*/


export interface IGeometry extends ymaps.IGeometry{
  setCoordinates: (a: number[]) => undefined
}

export interface IPlacemarkOptions extends ymaps.IPlacemarkOptions {
  preset: string;
}

export interface GeocodeResult {
  getAddressLine(): string;
  getAdministrativeAreas(): string[];
  getLocalities(): string[];
  getThoroughfare(): string | null;
  getPremise(): string | null;
  getPremiseNumber(): string | null;
}

export interface IGeoObjectCollection extends ymaps.IGeoObjectCollection {
  geoObjects: {
    get: (a: number) => GeocodeResult
  }
}
