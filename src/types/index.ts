export type InputAttributeType =
  | 'text'
  | 'email'
  | 'select'
  | 'file'
  | 'radio'
  | 'checkbox'
  | 'textarea'
  | 'button'
  | 'reset'
  | 'submit'
  | 'date'
  | 'datetime-local'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'range'
  | 'search'
  | 'tel'
  | 'url'
  | 'week'
  | 'password'
  | 'datetime'
  | 'time'
  | 'color';

export type ButtonAttributeType = 'button' | 'reset' | 'submit';

export interface IFieldValidator {
  isValid: boolean;
  error: string;
}
export interface IErrorConstant {
  [key: string]: IFieldValidator;
}
