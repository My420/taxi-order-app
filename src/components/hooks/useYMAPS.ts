import { useState, useEffect } from 'react';


const useMap = () => {
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
