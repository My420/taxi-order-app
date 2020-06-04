import React from 'react';
import styles from './Map.module.scss';
import useMap from '../hooks/useYMAPS';
import { createAddressMark, moveMark, getLocation } from '../../services/map';

const Map: React.FC = () => {
  console.log('render map!!!!!!!!');
  const map = useMap();
  if (map) {
    const addressMark = createAddressMark();

    const onMapClick = async (e: object | ymaps.IEvent) => {
      const event = e as ymaps.IEvent;
      const coords = event.get('coords') as number[];
      moveMark(addressMark, coords);
      map.geoObjects.add(addressMark);
      const address = await getLocation(coords);
      console.log(address);
    };


    map.events.add('click', onMapClick);
  }

  return (<div id="ymap" className={styles.map} />);
};
export default Map;
