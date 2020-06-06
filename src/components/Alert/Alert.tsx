import React from 'react';

export interface AlertProps {
  text?: string
}

const Alert: React.SFC<AlertProps> = ({ text }) => {
  const defaultText = 'Введите адрес подачи такси, или укажите место на карте.';
  const style = text ? 'danger' : 'info';
  return (<div className={`alert alert-${style}`} role="alert">{text || defaultText}</div>);
};

export default Alert;
