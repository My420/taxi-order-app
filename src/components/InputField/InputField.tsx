import React from 'react';
// import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useSelector, useDispatch } from 'react-redux';
import {
  ActionType, changeInput, getLocationByAddress, ReducerState,
} from '../../ducks/orderForm';
import { getInputStatus } from '../../ducks/selector';
import AddressInput from '../Inputs/AddressInput';


const InputField: React.FC = () => {
  console.log('renderInputField');

  const status = useSelector(getInputStatus);
  const dispatch = useDispatch<ThunkDispatch<ReducerState, {}, ActionType>>();
  const onInputChange = (_name: string, value: string) => {
    dispatch(changeInput(value));
  };
  const onButtonClick = () => {
    dispatch(getLocationByAddress());
  };
  return (
    <AddressInput
      {...status}
      onInputChange={onInputChange}
      onButtonClick={onButtonClick}
    />
  );
};

export default InputField;
