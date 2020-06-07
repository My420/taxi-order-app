import React from 'react';
import styles from './CrewCard.module.scss';

interface ICrewCardProps {
  car: string,
  color: string,
  number: string
}

const CrewCard: React.FC<ICrewCardProps> = ({ car, color, number }) => (

  <div className={`card ${styles.card}`} style={{ width: '18rem' }}>
    <div className="card-body">
      <h5 className="card-title">{car}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{color}</h6>
      <p className="card-text"><strong><em>{number}</em></strong></p>
    </div>
  </div>


);

export default CrewCard;
