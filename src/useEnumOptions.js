import { useMemo } from 'react';

export const useEnumOptions = (enumObject) => {
  return useMemo(() => {
    return Object?.entries(enumObject)?.map(([key, value]) => ({
      value: key,
      label: value,
    }));
  }, [enumObject]);
};


export const getOptionLabel = (options, value) => {
  const option = options.find(item => item.value === value);
  return option ? option.label : 'Unknown'; // Default fallback
};
