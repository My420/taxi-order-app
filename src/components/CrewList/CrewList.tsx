import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { getCrewStatus } from '../../ducks/selector';
import styles from './CrewList.module.scss';
import CrewItem from '../CrewItem';


const CrewList: React.FC = () => {
  const { list } = useSelector(getCrewStatus, shallowEqual);
  return (
    <div className={`card ${styles.list}`}>
      <ul className="list-group">
        {list && list.map((el) => (<CrewItem data={el} key={el.crew_id} />)) }
      </ul>
    </div>
  );
};

export default CrewList;
