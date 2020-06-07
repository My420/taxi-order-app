import { IErrorConstant, IFieldValidator } from '../types';

// eslint-disable-next-line no-useless-escape
const tester = /^(\d{1,2}(-[а-яё])*)*([А-ЯЁ]*[а-яё]*)(\s{1}[А-ЯЁ]*[а-яё]*)*(,*\s*)(\d+)$/i;

export const ERROR: IErrorConstant = {
  EMPTY: { isValid: false, error: 'Адрес на может быть пустым' },
  NOT_VALID: { isValid: false, error: 'Неправильный адрес. Адрес должен иметь вид: Улица, номер дома.' },
};

export const VALID_EMAIL = { isValid: true, error: '' };

const validateAddressInput = (address: string): IFieldValidator => {
  if (!address) return ERROR.EMPTY;

  const valid = tester.test(address);
  if (!valid) return ERROR.NOT_VALID;

  return VALID_EMAIL;
};

export default validateAddressInput;
