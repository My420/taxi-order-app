import React from 'react';
import Input, { InputProps } from './Input';

const areEqual = (prevProps: InputProps, nextProps: InputProps) => {
  const { value: prevValue, isValid: prevIsValid, error: prevError } = prevProps;
  const { value: nextValue, isValid: nextIsValid, error: nextError } = nextProps;
  return prevValue === nextValue && prevIsValid === nextIsValid && prevError === nextError;
};

export default React.memo(Input, areEqual);
