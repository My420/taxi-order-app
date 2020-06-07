import React from 'react';
// import styles from './ModalCard.module.scss';

export interface ModalCardProps {
  isSuccess: boolean
  orderID?: number | null,
  error?: string,
  onButtonClick: (e: React.MouseEvent) => void;
}


const ModalCard: React.FC<ModalCardProps> = ({
  isSuccess, error, orderID, onButtonClick,
}) => {
  const title = isSuccess ? 'Успешно!' : 'Ошибка!';
  const successMsg = `Ваш заказ №${orderID} принят, ожидайте звонка.`;
  const errorMsg = error || 'Адрес на карте и в поле ввода не совпадают!';

  return (
    <div className="modal d-flex justify-content-center align-items-center" tabIndex={-1} role="dialog" style={{ display: 'flex' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onButtonClick}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{isSuccess ? successMsg : errorMsg}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onButtonClick}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
