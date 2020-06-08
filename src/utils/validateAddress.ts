import { IErrorConstant, IFieldValidator } from '../types';

// eslint-disable-next-line no-useless-escape
const tester = /^(\d{1,2}-?[а-яё]\s)?([А-Яа-я]\s?)+(,?\s{1,3})(\d{1,4})([\\\/]\d{1,4})?$/i;

export const ERROR: IErrorConstant = {
  EMPTY: { isValid: false, error: 'Адрес на может быть пустым' },
  NOT_VALID: { isValid: false, error: 'Неправильный адрес. Адрес должен иметь вид: Улица, номер дома.' },
};

export const VALID_EMAIL = { isValid: true, error: '' };

const validateAddressInput = (address: string): IFieldValidator => {
  if (!address) return ERROR.EMPTY;

  const valid = tester.test(address.trim());
  if (!valid) return ERROR.NOT_VALID;

  return VALID_EMAIL;
};

export default validateAddressInput;
