import * as React from 'react';

interface ISpinnerProps {
  isLarge?: boolean,
}

const Spinner: React.FC<ISpinnerProps> = ({ isLarge }) => {
  const styles = {
    width: isLarge ? '5rem' : '2rem',
    height: isLarge ? '5rem' : '2rem',
  };
  return (
    <div className="spinner-border text-info" style={styles} role="status">
      <span className="sr-only">Loading...</span>
    </div>

  );
};

export default Spinner;
