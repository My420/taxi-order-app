import React from 'react';
import styles from './OrderForm.module.scss';
import MenuSubmitButton from '../MenuSubmitButton';
import CrewScreen from '../CrewScreen';
import Map from '../Map';
import CrewList from '../CrewList/CrewList';
import InputField from '../InputField';


const OrderForm: React.FC = () => (
  <form className="form" name="signInForm">
    <p className="visually-hidden">Форма заказа</p>
    <div className="row">
      <div className="col">
        <fieldset className={styles.inputs}>
          <InputField />
        </fieldset>
      </div>
    </div>

    <fieldset className={styles.crew}>
      <CrewScreen />
    </fieldset>
    <div className={`row flex-column flex-sm-row ${styles.noGut}`}>
      <div className="col col-sm-8">
        <fieldset className={styles.map}>
          <Map />
        </fieldset>
      </div>
      <div className="col col-sm-4">
        <fieldset className={styles.list}>
          <CrewList />
        </fieldset>
      </div>
    </div>

    <div className="row justify-content-center">
      <div className="col-auto">
        <fieldset className={styles.control}>
          <MenuSubmitButton
            text="Continue"
            name="signInSubmit"
            onButtonClick={() => {}}
            disabled
          />
        </fieldset>
      </div>
    </div>
  </form>
);

export default OrderForm;
