import React from 'react';
import { useSelector } from 'react-redux';
import CrewCard from '../CrewCard';
import { getLocationStatus, getCrewStatus } from '../../ducks/selector';
import styles from './CrewScreen.module.scss';
import Spinner from '../Spinner';
import Alert from '../Alert/Alert';


const CrewScreen: React.FC = () => {
  const locationStatus = useSelector(getLocationStatus);
  const crewStatus = useSelector(getCrewStatus);

  let component: React.ReactNode = <Alert />;

  if (locationStatus.isLoading || crewStatus.isLoading) {
    component = <Spinner />;
  } else if (locationStatus.error || crewStatus.error) {
    const text = locationStatus.error || crewStatus.error;
    component = <Alert text={text} />;
  } else if (crewStatus.crew && crewStatus.list) {
    const car = crewStatus.list[0];
    const props = {
      color: car.car_color,
      car: `${car.car_mark} ${car.car_model}`,
      number: car.car_number,
    };
    component = <CrewCard {...props} />;
  }

  return (
    <div className={`form-group row flex-column flex-sm-row ${styles.wrapper}`}>
      <div className="vol col-sm-3">
        <p>Подходящий экипаж:</p>
      </div>
      <div className={`col col-sm-6 ${styles.container}`}>
        {component}
      </div>
    </div>
  );
};

export default CrewScreen;
