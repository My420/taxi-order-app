import React from 'react';
import { InputAttributeType } from '../../../types';
// import styles from './Input.module.scss';

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
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
}

const Input: React.FC<InputProps> = ({
  value,
  onInputChange,
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

  return (
    <div className="form-group">
      <div className="row flex-column flex-sm-row">
        <label htmlFor={id} className="col col-sm-3 col-form-label">
          {label}
        </label>
        <div className="col col-sm-9">
          <input
            value={value}
            id={id}
            className="form-control"
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row justify-content-end">
        <div className="col col-sm-9">
          <span className={`alert-danger ${isValid ? 'invisible' : ''}`}>
            {error}
          </span>
        </div>
      </div>
    </div>
  );
};

/* Input.defaultProps = {
  extensionContainerClass: '',
  extensionInputClass: '',
}; */

export default Input;
