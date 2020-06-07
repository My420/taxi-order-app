import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { ActionType, clearOrder } from '../../ducks/orderForm';
import { getOrderStatus } from '../../ducks/selector';
import ModalCard from '../ModalCard';
import Spinner from '../Spinner';

const ModalWindow: React.FC = () => {
  const order = useSelector(getOrderStatus);
  const dispatch = useDispatch<Dispatch<ActionType>>();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(clearOrder());
  };

  const {
    isSending, isSuccess, error, orderID,
  } = order;

  return (
    <div>
      {isSending
        && (
        <div className="modal d-flex justify-content-center align-items-center" tabIndex={-1} role="dialog" style={{ display: 'flex' }}>
          <Spinner isLarge />
        </div>
        )}
      {isSuccess && <ModalCard isSuccess orderID={orderID} onButtonClick={handleClick} />}
      {error && <ModalCard isSuccess={false} error={error} onButtonClick={handleClick} />}
    </div>

  );
};

export default ModalWindow;
