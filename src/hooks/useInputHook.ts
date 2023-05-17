import React from 'react';

const useInputHook = (initialValue: string) => {
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return { value, onChange };
};

export default useInputHook;
