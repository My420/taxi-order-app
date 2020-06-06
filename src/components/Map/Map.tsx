import React, { useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import {
  ActionType, setLocationFromCoords, ReducerState,
} from '../../ducks/orderForm';
import mapService, { IAddressError, IMarkData } from '../../services/map';
import styles from './Map.module.scss';


const Map: React.FC = () => {
  console.log('render map!!!!!!!!');

  const dispatch = useDispatch<ThunkDispatch<ReducerState, {}, ActionType>>();

  const onMapClick = (data: IMarkData | IAddressError) => {
    dispatch(setLocationFromCoords(data));
  };

  useEffect(() => {
    mapService.init('ymap');
    mapService.onAddressMarkChange(onMapClick);
  });
  return (<div id="ymap" className={styles.map} />);
};
export default Map;
