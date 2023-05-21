import React from 'react';

const useInputHook = (initialValue: string) => {
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return { value, onChange };
};

export default useInputHook;
