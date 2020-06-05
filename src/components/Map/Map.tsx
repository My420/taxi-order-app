import React, { useEffect } from 'react';
import styles from './Map.module.scss';
import mapService from '../../services/map';

const Map: React.FC = () => {
  console.log('render map!!!!!!!!');

  useEffect(() => {
    mapService.init('ymap');
  });
  return (<div id="ymap" className={styles.map} />);
};
export default Map;
