import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ActionType, ReducerState, sendUserOrder } from '../../ducks/orderForm';
import MenuSubmitButton from '../MenuSubmitButton';
import CrewScreen from '../CrewScreen';
import Map from '../Map';
import CrewList from '../CrewList';
import InputField from '../InputField';
import styles from './OrderForm.module.scss';
import { getFormStatus } from '../../ducks/selector';
import ModalWindow from '../ModalWindow';

const OrderForm: React.FC = () => {
  const data = useSelector(getFormStatus, shallowEqual);
  const dispatch = useDispatch<ThunkDispatch<ReducerState, {}, ActionType>>();
  const isFormValid = data.isAddressValid && data.isInputValid && !!data.crew;

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(sendUserOrder());
  };

  return (
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
              text="Заказать"
              name="signInSubmit"
              onButtonClick={onClick}
              disabled={!isFormValid}
            />
          </fieldset>
        </div>
      </div>
      <ModalWindow />
    </form>
  );
};

export default OrderForm;
