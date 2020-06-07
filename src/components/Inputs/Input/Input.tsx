import React from 'react';
import { InputAttributeType } from '../../../types';
import styles from './Input.module.scss';

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  btnName: string;
  type: InputAttributeType;
  name: string;
  id: string;
  placeholder: string;
  extensionContainerClass?: string;
  extensionInputClass?: string;
  value: string;
  isValid: boolean;
  error: string;
  onInputChange: (name: string, value: string) => void;
  onButtonClick: (e: React.MouseEvent) => void;
  onEnterPress: (e: React.KeyboardEvent) => void;
}

const Input: React.FC<InputProps> = ({
  value,
  btnName,
  onInputChange,
  onButtonClick,
  onEnterPress,
  label,
  name,
  id,
  type,
  placeholder,
  isValid,
  error,
}) => {
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value: newValue } = evt.currentTarget;
    onInputChange(inputName, newValue);
  };

  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    onButtonClick(evt);
  };

  const handleKeyPress = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' && isValid) {
      evt.preventDefault();
      onEnterPress(evt);
    }
  };

  return (
    <div className="form-group">
      <div className="row flex-column flex-sm-row">
        <label htmlFor={id} className="col col-sm-3 col-form-label">
          {label}
        </label>
        <div className="col col-sm-7">
          <input
            value={value}
            id={id}
            className="form-control"
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className={`col col-sm-2 d-flex justify-content-center ${styles.btnContainer}`}>
          <button
            type="button"
            className={`btn btn-${isValid ? 'info' : 'secondary'}`}
            onClick={handleClick}
            disabled={!isValid}
          >
            {btnName}
          </button>
        </div>
      </div>
      <div className="row justify-content-end">
        <div className="col col-sm-9">
          <span className={`alert-danger ${styles.error}`}>
            {error}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Input;

// ${isValid ? 'invisible' : ''}
