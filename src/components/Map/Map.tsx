import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import {
  ILocation, loadLocationSuccess, ActionType, loadLocationError,
} from '../../ducks/orderForm';
import mapService from '../../services/map';
import styles from './Map.module.scss';


const Map: React.FC = () => {
  console.log('render map!!!!!!!!');

  const dispatch = useDispatch<Dispatch<ActionType>>();

  const onMapClick = (data: ILocation | string) => {
    if (typeof data === 'string') {
      dispatch(loadLocationError(data));
    } else {
      dispatch(loadLocationSuccess(data));
    }
  };

  useEffect(() => {
    mapService.init('ymap');
    mapService.subscribe(onMapClick);
  });
  return (<div id="ymap" className={styles.map} />);
};
export default Map;
