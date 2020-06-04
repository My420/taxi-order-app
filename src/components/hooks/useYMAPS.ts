import { useState, useEffect } from 'react';
import { IGeoObjectCollection } from '../../types/ymap';
import { DEFAULT_MAP_OPTIONS } from '../../utils/constant';


/* const useMap = () => {
  const [map, setMap] = useState<ymaps.Map | null>(null);

  const createMap = () => {
    if (!map) {
      const myMap = new window.ymaps.Map('ymap', {
        center: [55.76, 37.64],
        zoom: 7,
      });
      setMap(myMap);
    }
  };

  useEffect(() => {
    window.ymaps.ready(createMap);
  });


  return map;
};

export default useMap;
*/


const useMap = () => {
  const [map, setMap] = useState<ymaps.Map | null>(null);

  const createMap = async () => {
    if (!map) {
      try {
        const location = await window.ymaps.geolocation.get() as IGeoObjectCollection;
        const bounds = location.geoObjects.get(0).properties.get('boundedBy', {}) as number[];
        const mapState = window.ymaps.util.bounds.getCenterAndZoom(bounds, [200, 200]);

        const myMap = new window.ymaps.Map('ymap', mapState);
        setMap(myMap);
      } catch (e) {
        const myMap = new window.ymaps.Map('ymap', DEFAULT_MAP_OPTIONS);
        setMap(myMap);
      }
    }
  };

  useEffect(() => {
    window.ymaps.ready(createMap);
  });
  return map;
};

export default useMap;
