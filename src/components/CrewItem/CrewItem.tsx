import React from 'react';
import { ICrewInfo } from '../../ducks/orderForm';
import styles from './CrewItem.module.scss';

export interface CrewItemProps {
  data: ICrewInfo
}

const CrewItem: React.FC<CrewItemProps> = ({ data }) => (
  <li className="list-group-item d-flex justify-content-between">
    <div className={styles.wrapper}>
      <h5 className={styles.model}>{`${data.car_mark} ${data.car_model}`}</h5>
      <p className={styles.color}>{`${data.car_color}`}</p>
    </div>
    <p className={styles.distance}><em>{`${data.distance}м`}</em></p>
  </li>
);

export default CrewItem;
