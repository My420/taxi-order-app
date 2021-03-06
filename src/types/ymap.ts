// inaccuracies in the package @types/yandex-maps
/*
ymaps.d.ts

function geocode(request: string | number[], options?:{[key: string]: any}):
Promise<IGeoObjectCollection>;


namespace geolocation {
        interface GeoLocationOption {
            autoReverseGeocode?: boolean;
            mapStateAutoApply?: boolean;
            provider?: string;
            timeout?: number;
            useMapMargin?: boolean;
        }
        function get(options: GeoLocationOption): GeoObject;
    }
*/


export interface IGeometry extends ymaps.IGeometry{
  setCoordinates: (a: number[]) => undefined
  getCoordinates: () => number[];
}

export interface IPlacemarkOptions extends ymaps.IPlacemarkOptions {
  preset: string;
}

export interface GeocodeResult extends ymaps.GeoObject {
  // / properties: ymaps.IDataManager;
  geometry: IGeometry,
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
