import React from 'react';
import FROM_ADDRESS_INPUT from '../../../utils/constant';
import AuthInput from '../Input';

export interface AddressInputProps {
  extensionContainerClass?: string;
  extensionInputClass?: string;
  value: string;
  isValid: boolean;
  error: string;
  onInputChange: (name: string, value: string) => void;
  onButtonClick: (e: React.MouseEvent) => void;
}

const AddressInput: React.FC<AddressInputProps> = (props) => (
  <AuthInput
    id="fromAddress"
    name={`${FROM_ADDRESS_INPUT}`}
    type="text"
    placeholder="Введите адрес"
    label="Введите адрес"
    btnName="Найти"
    {...props}
  />
);

AddressInput.defaultProps = {
  extensionContainerClass: '',
  extensionInputClass: '',
};

export default AddressInput;
