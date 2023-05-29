import React, { useEffect } from 'react';

const useInputHook = (initialValue: string) => {
  const [value, setValue] = React.useState(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const reset = () => {
    setValue(initialValue);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return { value, onChange, reset };
};

export default useInputHook;
